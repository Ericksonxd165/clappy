from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'cajas', views.CajaViewSet, basename='caja')
router.register(r'cajaspersona', views.CajaPersonaViewSet, basename='cajapersona')
router.register(r'notifications', views.NotificationViewSet, basename='notification')
router.register(r'pago-movil-config', views.PagoMovilConfigViewSet, basename='pagomovilconfig')

urlpatterns = [
    path('', include(router.urls)),
]
