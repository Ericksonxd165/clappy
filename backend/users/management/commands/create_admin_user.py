from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = 'Creates a default superuser if one does not exist.'

    def handle(self, *args, **options):
        User = get_user_model()
        if not User.objects.filter(username='admin').exists():
            self.stdout.write(self.style.SUCCESS('Creating default admin user...'))
            User.objects.create_superuser('admin', 'admin@example.com', 'adminpassword')
            self.stdout.write(self.style.SUCCESS('Default admin user created successfully.'))
        else:
            self.stdout.write(self.style.WARNING('Default admin user already exists.'))
