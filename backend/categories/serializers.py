from rest_framework import serializers
from .models import Category


class CategorySerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'image', 'is_active', 'created_at']
