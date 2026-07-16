from rest_framework import serializers
from .models import Order, OrderItem
from products.models import Product


class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), required=True)
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    status = serializers.CharField(source='order_status')
    customer_name = serializers.SerializerMethodField()
    phone = serializers.SerializerMethodField()
    order_date = serializers.DateTimeField(source='created_at', read_only=True)
    total_amount = serializers.DecimalField(source='total', max_digits=10, decimal_places=2, read_only=True)
    payment_method = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'status', 'customer_name', 'phone',
            'pickup_location', 'order_date', 'subtotal', 'delivery_fee',
            'total_amount', 'payment_method', 'payment_status', 'delivery_status',
            'items', 'created_at',
        ]

    def get_customer_name(self, obj):
        user = getattr(obj, 'user', None)
        if user:
            return getattr(user, 'full_name', None) or getattr(user, 'student_email', None) or ''
        return ''

    def get_phone(self, obj):
        user = getattr(obj, 'user', None)
        if user:
            return getattr(user, 'phone_number', '')
        return ''

    def get_payment_method(self, obj):
        payment = getattr(obj, 'payment', None)
        if payment:
            return payment.payment_method
        return ''
