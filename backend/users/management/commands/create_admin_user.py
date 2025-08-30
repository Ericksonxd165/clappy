import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = 'Creates or updates the default superuser.'

    def handle(self, *args, **options):
        User = get_user_model()
        username = 'admin'
        password = os.environ.get('ADMIN_PW', 'adminpassword')
        email = 'admin@example.com'

        try:
            user = User.objects.get(username=username)
            # User exists, update the password
            user.set_password(password)
            user.save()
            self.stdout.write(self.style.SUCCESS(f'Password for admin user "{username}" has been updated.'))
        except User.DoesNotExist:
            # User does not exist, create it
            User.objects.create_superuser(username, email, password)
            self.stdout.write(self.style.SUCCESS(f'Default admin user "{username}" created successfully.'))
