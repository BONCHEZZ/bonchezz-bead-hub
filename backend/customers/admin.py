from django.contrib import admin
from .models import Customer


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['user', 'orders_count', 'registered_at']
    search_fields = ['user__full_name', 'user__student_email', 'user__phone_number']
