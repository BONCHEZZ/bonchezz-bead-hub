from rest_framework import generics, permissions
from .models import Customer
from .serializers import CustomerSerializer


class CustomerListView(generics.ListAPIView):
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = Customer.objects.select_related('user').all()
    pagination_class = None
