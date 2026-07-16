from django.contrib import admin
from .models import Product, ProductImage


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'stock_quantity', 'availability', 'featured')
    list_filter = ('availability', 'featured', 'category')
    search_fields = ('name', 'description')


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('product', 'image')
