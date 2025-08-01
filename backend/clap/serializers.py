from rest_framework import serializers
from .models import caja, cajaPersona

class CajaSerializer(serializers.ModelSerializer):
    class Meta:
        model = caja
        fields = '__all__'
        read_only_fields = ('sold',)

class CajaPersonaSerializer(serializers.ModelSerializer):
    PAYMENT_METHOD_CHOICES = [
        ('Efectivo', 'Efectivo'),
        ('Pago Movil', 'Pago Movil'),
    ]
    
    MONEDA_CHOICES = [
        ('Bs', 'Bolivares'),
        ('USD', 'Dolar'),
        ('EUR', 'Euro'),
        ('Peso', 'Peso'),
    ]
    
    payment_method = serializers.ChoiceField(choices=PAYMENT_METHOD_CHOICES)
    moneda = serializers.ChoiceField(choices=MONEDA_CHOICES, default='Bs')
    
    class Meta:
        model = cajaPersona
        fields = '__all__'

    def create(self, validated_data):
        caja_instance = validated_data['cajaid']
        if caja_instance.stock > 0:
            caja_instance.stock -= 1
            caja_instance.save()
            return super().create(validated_data)
        else:
            raise serializers.ValidationError("No hay cajas disponibles en stock.")
