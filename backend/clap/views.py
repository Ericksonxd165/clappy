from django.shortcuts import render
from rest_framework import viewsets
from .models import caja, cajaPersona
from .serializers import CajaSerializer, CajaPersonaSerializer

# Create your views here.

class CajaViewSet(viewsets.ModelViewSet):
    queryset = caja.objects.all()
    serializer_class = CajaSerializer

class CajaPersonaViewSet(viewsets.ModelViewSet):
    queryset = cajaPersona.objects.all()
    serializer_class = CajaPersonaSerializer
