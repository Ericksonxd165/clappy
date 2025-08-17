from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import caja, cajaPersona, Notification
from .serializers import CajaSerializer, CajaPersonaSerializer, NotificationSerializer

# Create your views here.

class CajaViewSet(viewsets.ModelViewSet):
    queryset = caja.objects.all()
    serializer_class = CajaSerializer
    permission_classes = [IsAdminUser]

class CajaPersonaViewSet(viewsets.ModelViewSet):
    serializer_class = CajaPersonaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return cajaPersona.objects.all()
        return cajaPersona.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser])
    def approve_payment(self, request, pk=None):
        caja_persona = self.get_object()
        caja_persona.status = 'APPROVED'
        caja_persona.save()
        Notification.objects.create(user=caja_persona.user, message="Your payment has been approved.")
        return Response({'status': 'Payment approved'})

    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser])
    def reject_payment(self, request, pk=None):
        caja_persona = self.get_object()
        caja_persona.status = 'REJECTED'
        caja_persona.save()
        Notification.objects.create(user=caja_persona.user, message="Your payment has been rejected.")
        return Response({'status': 'Payment rejected'})

    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser])
    def confirm_delivery(self, request, pk=None):
        caja_persona = self.get_object()
        caja_persona.delivered = True
        caja_persona.save()
        Notification.objects.create(user=caja_persona.user, message="Your box has been confirmed for delivery.")
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
