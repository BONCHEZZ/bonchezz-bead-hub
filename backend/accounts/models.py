from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, student_email, password=None, **extra_fields):
        if not student_email:
            raise ValueError('The Student Email is required')
        email = self.normalize_email(student_email)
        extra_fields.setdefault('username', email)
        user = self.model(student_email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, student_email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(student_email, password, **extra_fields)


class User(AbstractUser):
    full_name = models.CharField(max_length=150)
    student_email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'student_email'
    REQUIRED_FIELDS = ['full_name', 'phone_number']
    objects = CustomUserManager()

    def __str__(self):
        return self.full_name or self.student_email
