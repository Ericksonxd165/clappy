from django.shortcuts import render
from rest_framework import viewsets, generics, permissions, status, views
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .serializer import UserSerializer, RegisterSerializer
from .models import UsersCustom
from django.core.mail import send_mail
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.conf import settings
from django.shortcuts import get_object_or_404


class CurrentUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class RegisterView(generics.CreateAPIView):
    queryset = UsersCustom.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        return token
    
class Custom_token_obtain_pair_view(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

# Create your views here.
class UserView(viewsets.ModelViewSet):
    serializer_class=UserSerializer
    queryset=UsersCustom.objects.all()
    permission_classes = [permissions.IsAdminUser]


class RequestPasswordResetView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')
        try:
            user = UsersCustom.objects.get(email=email)
        except UsersCustom.DoesNotExist:
            return Response({'error': 'No hay un usuario registrado con este correo electrónico.'}, status=status.HTTP_404_NOT_FOUND)

        token_generator = PasswordResetTokenGenerator()
        token = token_generator.make_token(user)
        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))

        reset_link = f"{settings.APP_BASE_URL}/reset-password/{uidb64}/{token}"

        email_subject = 'Recuperación de Contraseña'
        email_body = f"""
Hola {user.fullname or user.username},

Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.
Haz clic en el siguiente enlace para continuar:
{reset_link}

Si no solicitaste este cambio, puedes ignorar este correo.

Saludos,
El equipo de la aplicación
"""
        try:
            send_mail(
                email_subject,
                email_body,
                settings.EMAIL_HOST_USER,
                [user.email],
                fail_silently=False,
            )
            return Response({'success': 'Se ha enviado un correo de recuperación.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': f'Hubo un problema al enviar el correo: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PasswordResetConfirmView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = UsersCustom.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, UsersCustom.DoesNotExist):
            user = None

        token_generator = PasswordResetTokenGenerator()
        if user is not None and token_generator.check_token(user, token):
            new_password = request.data.get('password')
            if not new_password:
                return Response({'error': 'La nueva contraseña es requerida.'}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(new_password)
            user.save()
            return Response({'success': 'Tu contraseña ha sido restablecida exitosamente.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'El enlace de restablecimiento no es válido o ha expirado.'}, status=status.HTTP_400_BAD_REQUEST)
