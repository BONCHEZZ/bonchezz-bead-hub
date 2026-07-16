from rest_framework import serializers
from .models import Review
from products.models import Product


class ReviewSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), required=True)
    user_name = serializers.CharField(source='user.full_name', read_only=True)
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'user', 'user_name', 'product', 'product_name', 'rating', 'comment', 'created_at']
