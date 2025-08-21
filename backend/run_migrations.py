import os

os.system("pip install -r backend/requirements.txt")
os.chdir("backend")
os.system("python manage.py makemigrations clap")
os.system("python manage.py migrate")
