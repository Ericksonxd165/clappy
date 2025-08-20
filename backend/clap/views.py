from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import caja, cajaPersona, Notification, PagoMovilConfig
from .serializers import CajaSerializer, CajaPersonaSerializer, NotificationSerializer, PagoMovilConfigSerializer
from users.models import UsersCustom

# Create your views here.

class CajaViewSet(viewsets.ModelViewSet):
    queryset = caja.objects.all()
    serializer_class = CajaSerializer

    def get_permissions(self):
        if self.action == 'list' or self.action == 'retrieve':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_price = instance.price
        response = super().update(request, *args, **kwargs)
        instance.refresh_from_db()
        new_price = instance.price

        if old_price != new_price:
            users = UsersCustom.objects.filter(is_staff=False) # Notify only non-admin users
            for user in users:
                Notification.objects.create(
                    user=user,
                    message=f"El precio de la caja ha sido actualizado a ${new_price}."
                )
        return response

class CajaPersonaViewSet(viewsets.ModelViewSet):
    serializer_class = CajaPersonaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return cajaPersona.objects.all()
        return cajaPersona.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        main_caja = caja.objects.order_by('-date').first()
        if not main_caja:
            return Response(
                {"error": "No hay una caja principal disponible."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if the user already has a pending or approved payment for this season's box
        existing_payment = cajaPersona.objects.filter(
            user=request.user,
            cajaid=main_caja,
            status__in=['PENDING', 'APPROVED']
        ).exists()

        if existing_payment:
            return Response(
                {"error": "Ya tienes un pago registrado para la caja de esta temporada."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if payments are enabled
        if not main_caja.payments_enabled:
            return Response(
                {"error": "Los pagos se encuentran deshabilitados en este momento."},
                status=status.HTTP_403_FORBIDDEN
            )

        # Check if there is enough stock
        if main_caja.stock <= 0:
            return Response(
                {"error": "No hay stock disponible."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create the CajaPersona instance
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Decrement the stock
        main_caja.stock -= 1
        main_caja.save()

        # Save the CajaPersona instance
        serializer.save(user=request.user, cajaid=main_caja)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser])
    def approve_payment(self, request, pk=None):
        caja_persona = self.get_object()
        caja_persona.status = 'APPROVED'
        caja_persona.save()
        Notification.objects.create(user=caja_persona.user, message="Tu pago ha sido aprobado.")
        return Response({'status': 'Payment approved'})

    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser])
    def reject_payment(self, request, pk=None):
        caja_persona = self.get_object()
        caja_persona.status = 'REJECTED'
        caja_persona.save()
        Notification.objects.create(user=caja_persona.user, message="Tu pago ha sido rechazado.")
        return Response({'status': 'Payment rejected'})

    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser])
    def confirm_delivery(self, request, pk=None):
        caja_persona = self.get_object()
        caja_persona.delivered = True
        caja_persona.save()
        Notification.objects.create(user=caja_persona.user, message="La entrega de tu caja ha sido confirmada.")
        return Response({'status': 'Delivery confirmed'})

class NotificationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)

    @action(detail=True, methods=['post'])
    def mark_as_read(self, request, pk=None):
        notification = self.get_object()
        notification.read = True
        notification.save()
        return Response({'status': 'Notification marked as read'})

class PagoMovilConfigViewSet(viewsets.ModelViewSet):
    queryset = PagoMovilConfig.objects.all()
    serializer_class = PagoMovilConfigSerializer
    permission_classes = [IsAdminUser]

    def list(self, request, *args, **kwargs):
        config, created = PagoMovilConfig.objects.get_or_create(
            id=1,
            defaults={'cedula': '', 'telefono': '', 'banco': ''}
        )
        serializer = self.get_serializer(config)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        # Always return the singleton instance
        return self.list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        # Prevent creating more than one instance
        if PagoMovilConfig.objects.count() > 0 and 'id' not in request.data:
             return Response(
                {"error": "La configuración de Pago Móvil ya existe."},
                status=status.HTTP_400_BAD_REQUEST
            )
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        # The 'pk' will be passed in the URL, but we always update the singleton.
        instance = PagoMovilConfig.objects.first()
        if not instance:
            instance = PagoMovilConfig.objects.create(cedula="", telefono="", banco="")

        serializer = self.get_serializer(instance, data=request.data, partial=kwargs.pop('partial', False))
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
