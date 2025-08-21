import os
import requests
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import caja, cajaPersona, Notification, PagoMovilConfig, SupportConfig
from .serializers import CajaSerializer, CajaPersonaSerializer, NotificationSerializer, PagoMovilConfigSerializer, SupportConfigSerializer
from users.models import UsersCustom
from rest_framework import serializers

# Create your views here.

class PaymentDetailsSerializer(serializers.Serializer):
    caja = CajaSerializer()
    pago_movil_config = PagoMovilConfigSerializer()

class CajaViewSet(viewsets.ModelViewSet):
    queryset = caja.objects.all()
    serializer_class = CajaSerializer

    def get_permissions(self):
        if self.action == 'list' or self.action == 'retrieve' or self.action == 'payment_details':
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

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def payment_details(self, request):
        main_caja = caja.objects.order_by('-date').first()
        pago_movil_config, created = PagoMovilConfig.objects.get_or_create(
            id=1,
            defaults={'cedula': '', 'telefono': '', 'banco': ''}
        )

        if not main_caja:
            return Response(
                {"error": "No hay una caja principal disponible."},
                status=status.HTTP_404_NOT_FOUND
            )

        caja_serializer = CajaSerializer(main_caja)
        pago_movil_serializer = PagoMovilConfigSerializer(pago_movil_config)

        response_data = {
            'caja': caja_serializer.data,
            'pago_movil_config': pago_movil_serializer.data
        }
        return Response(response_data)

    @action(detail=False, methods=['post'], permission_classes=[IsAdminUser])
    def clear_season_data(self, request):
        """
        Deletes all payments, associated images, and boxes to start a new season.
        Creates a new box with a specified price and stock.
        """
        try:
            # Data from request
            new_price = request.data.get('price')
            new_stock = request.data.get('stock')

            if new_price is None or new_stock is None:
                return Response(
                    {"error": "Price and stock for the new season are required."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Delete payment images
            payments = cajaPersona.objects.all()
            for payment in payments:
                if payment.img:
                    image_path = os.path.join(settings.MEDIA_ROOT, str(payment.img))
                    if os.path.exists(image_path):
                        os.remove(image_path)

            # Delete all payments
            payments.delete()

            # Delete all existing boxes
            caja.objects.all().delete()

            # Delete all notifications
            Notification.objects.all().delete()

            # Create a new box for the new season
            new_caja = caja.objects.create(
                price=new_price,
                stock=new_stock,
                payments_enabled=True
            )

            # Notify all non-admin users
            users = UsersCustom.objects.filter(is_staff=False)
            for user in users:
                Notification.objects.create(
                    user=user,
                    message="¡Nueva temporada de cajas disponible! Ya puedes realizar tu pago."
                )

            return Response(
                {"status": "Season data cleared and new season started.", "new_box_id": new_caja.id},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"error": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

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
        Notification.objects.create(user=caja_persona.user, message="Tu pago ha sido aprobado, Retira tu caja")
        return Response({'status': 'Payment approved'})

    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser])
    def reject_payment(self, request, pk=None):
        caja_persona = self.get_object()
        caja_persona.status = 'REJECTED'
        caja_persona.save()

        support_config, created = SupportConfig.objects.get_or_create(id=1)
        support_email = support_config.email
        support_phone = support_config.phone_number

        message = f"Tu pago ha sido rechazado. Si crees que esto es un error, por favor contacta a soporte: {support_email} o {support_phone}"
        Notification.objects.create(user=caja_persona.user, message=message)

        return Response({'status': 'Payment rejected'})

    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser])
    def confirm_delivery(self, request, pk=None):
        caja_persona = self.get_object()
        caja_persona.delivered = True
        caja_persona.save()
        Notification.objects.create(user=caja_persona.user, message="La entrega de tu caja ha sido confirmada.")
        return Response({'status': 'Delivery confirmed'})

    @action(detail=False, methods=['post'], permission_classes=[IsAdminUser])
    def admin_create_payment(self, request):
        user_id = request.data.get('user_id')
        payment_method = request.data.get('payment_method')

        if not user_id or not payment_method:
            return Response(
                {"error": "User ID and payment method are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = UsersCustom.objects.get(id=user_id)
        except UsersCustom.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        main_caja = caja.objects.order_by('-date').first()
        if not main_caja:
            return Response(
                {"error": "No hay una caja principal disponible."},
                status=status.HTTP_400_BAD_REQUEST
            )

        existing_payment = cajaPersona.objects.filter(
            user=user,
            cajaid=main_caja,
            status__in=['PENDING', 'APPROVED']
        ).exists()

        if existing_payment:
            return Response(
                {"error": "El usuario ya tiene un pago registrado para la caja de esta temporada."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if main_caja.stock <= 0:
            return Response(
                {"error": "No hay stock disponible."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Prepare data for the serializer
        payment_data = {
            'cajaid': main_caja.id,
            'user': user.id,
            'payment_method': payment_method,
            'amount': main_caja.price,
            'status': 'APPROVED' # Admin-created payments are auto-approved
        }

        serializer = self.get_serializer(data=payment_data)
        serializer.is_valid(raise_exception=True)

        main_caja.stock -= 1
        main_caja.save()

        serializer.save(user=user, cajaid=main_caja)

        Notification.objects.create(user=user, message=f"Un administrador ha registrado un pago de '{payment_method}' para tu caja.")

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class NotificationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user).order_by('-timestamp')

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


class SupportConfigViewSet(viewsets.ModelViewSet):
    queryset = SupportConfig.objects.all()
    serializer_class = SupportConfigSerializer
    permission_classes = [IsAdminUser]

    def list(self, request, *args, **kwargs):
        config, created = SupportConfig.objects.get_or_create(
            id=1,
            defaults={'email': 'support@example.com', 'phone_number': '1234567890'}
        )
        serializer = self.get_serializer(config)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        instance = SupportConfig.objects.first()
        if not instance:
            instance = SupportConfig.objects.create(email="support@example.com", phone_number="1234567890")

        serializer = self.get_serializer(instance, data=request.data, partial=kwargs.pop('partial', False))
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

def get_dollar_rate(request):
    try:
        response = requests.get('https://ve.dolarapi.com/v1/dolares/oficial')
        response.raise_for_status()  # Raise an exception for bad status codes
        data = response.json()
        return JsonResponse({'rate': data.get('promedio')})
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)
