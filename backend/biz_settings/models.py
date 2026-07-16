from django.db import models

from django.conf import settings


class BusinessSettings(models.Model):
    business_name = models.CharField(max_length=200)
    logo_url = models.URLField(blank=True)
    phone = models.CharField(max_length=50)
    email = models.EmailField()
    description = models.TextField(blank=True)
    pickup_location = models.CharField(max_length=200)
    instagram = models.URLField(blank=True)
    tiktok = models.URLField(blank=True)
    whatsapp = models.CharField(max_length=50, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Business settings'

    def __str__(self):
        return self.business_name

    @classmethod
    def get_solo(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj
