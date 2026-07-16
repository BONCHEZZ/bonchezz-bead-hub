from rest_framework import serializers, permissions, generics
from .models import Customer


class CustomerSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='user.id')
    full_name = serializers.CharField(source='user.full_name')
    email = serializers.EmailField(source='user.student_email')
    phone = serializers.CharField(source='user.phone_number')
    registered_at = serializers.DateTimeField()

    class Meta:
        model = Customer
        fields = ['id', 'full_name', 'email', 'phone', 'registered_at', 'orders_count']


class CustomerListView(generics.ListAPIView):
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = Customer.objects.select_related('user').all()
