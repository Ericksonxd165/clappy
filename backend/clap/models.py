from django.db import models
from users.models import UsersCustom
# Create your models here.


class caja(models.Model):
     
        id = models.AutoField(primary_key=True)
        price = models.DecimalField(max_digits=10, decimal_places=2)
        stock = models.IntegerField(default=0)
        date = models.DateTimeField(auto_now_add=True)
        payments_enabled = models.BooleanField(default=True)

        @property
        def sold(self):
                return cajaPersona.objects.filter(cajaid=self, status='APPROVED').count()

        @property
        def delivered_count(self):
                return cajaPersona.objects.filter(cajaid=self, delivered=True).count()

        def __str__(self):
                return str(self.id)
        
class cajaPersona(models.Model):
    
        id = models.AutoField(primary_key=True)
        cajaid = models.ForeignKey(caja, on_delete=models.CASCADE)
        user = models.ForeignKey(UsersCustom, on_delete=models.CASCADE)
        date = models.DateTimeField(auto_now_add=True)
        delivered = models.BooleanField(default=False)
        payment_method = models.CharField(max_length=50, blank=True, null=True)
        amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
        reference = models.CharField(max_length=100, blank=True, null=True)
        bank_name = models.CharField(max_length=100, blank=True, null=True)
        sender_phone = models.CharField(max_length=20, blank=True, null=True)
        img = models.ImageField(upload_to='caja_images/', blank=True, null=True)
        moneda = models.CharField(max_length=10, default='Bs')
        PAYMENT_STATUS_CHOICES = [
                ('PENDING', 'Pending'),
                ('APPROVED', 'Approved'),
                ('REJECTED', 'Rejected'),
        ]
        status = models.CharField(
                max_length=10,
                choices=PAYMENT_STATUS_CHOICES,
                default='PENDING',
        )
        
        def __str__(self):
                return f"{self.user.username} - {self.cajaid.id} - {self.date}"

class Notification(models.Model):
    user = models.ForeignKey(UsersCustom, on_delete=models.CASCADE, related_name='notifications')
    message = models.CharField(max_length=255)
    read = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification for {self.user.username}: {self.message}"

class PagoMovilConfig(models.Model):
    cedula = models.CharField(max_length=20)
    telefono = models.CharField(max_length=20)
    banco = models.CharField(max_length=100)

    def __str__(self):
        return f"Configuración de Pago Móvil ({self.banco})"

class SupportConfig(models.Model):
    email = models.EmailField()
    phone_number = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return f"Configuración de Soporte ({self.email})"