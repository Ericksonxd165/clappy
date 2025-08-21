from rest_framework import serializers
from .models import caja, cajaPersona, Notification, PagoMovilConfig

class CajaSerializer(serializers.ModelSerializer):
    sold = serializers.IntegerField(read_only=True)
    delivered_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = caja
        fields = ['id', 'price', 'stock', 'date', 'payments_enabled', 'sold', 'delivered_count']

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
        fields = ['id', 'cajaid', 'user', 'date', 'delivered', 'payment_method', 'amount', 'reference', 'bank_name', 'sender_phone', 'img', 'moneda', 'status']
        read_only_fields = ('status', 'user',)

    def create(self, validated_data):
        caja_instance = validated_data['cajaid']
        if caja_instance.stock > 0:
            caja_instance.stock -= 1
            validated_data['user'] = self.context['request'].user
            caja_instance.save()
            return super().create(validated_data)
        else:
            raise serializers.ValidationError("No hay cajas disponibles en stock.")

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
        read_only_fields = ('user',)

class PagoMovilConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = PagoMovilConfig
        fields = '__all__'
