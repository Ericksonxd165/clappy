from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'cajas', views.CajaViewSet, basename='caja')
router.register(r'cajaspersona', views.CajaPersonaViewSet, basename='cajapersona')

urlpatterns = [
    path('', include(router.urls)),
]
