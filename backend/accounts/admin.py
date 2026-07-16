from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('student_email', 'full_name', 'phone_number', 'is_active', 'date_joined')
    fieldsets = UserAdmin.fieldsets + ((None, {'fields': ('full_name', 'student_email', 'phone_number')}),)
    add_fieldsets = UserAdmin.add_fieldsets + ((None, {'fields': ('full_name', 'student_email', 'phone_number')}),)
