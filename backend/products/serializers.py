from rest_framework import serializers
from .models import Product, ProductImage
from categories.models import Category


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'description',
            'price',
            'discount_price',
            'stock_quantity',
            'category',
            'category_name',
            'rating',
            'availability',
            'featured',
            'created_at',
            'images',
            'image',
        ]

    def get_image(self, obj):
        first_image = obj.images.first()
        if not first_image:
            return None
        try:
            request = self.context.get('request')
            return request.build_absolute_uri(first_image.image.url) if request else first_image.image.url
        except Exception:
            return first_image.image.url

    def create(self, validated_data):
        product = Product.objects.create(**validated_data)
        return product
