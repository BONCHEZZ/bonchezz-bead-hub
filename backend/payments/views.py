from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from orders.models import Order
from .models import Payment
from .serializers import PaymentSerializer


class PaymentListView(generics.ListAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = Payment.objects.filter(user=self.request.user)
        if self.request.user.is_staff or self.request.user.is_superuser:
            return Payment.objects.all()
        return qs


class PaymentCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        order_id = request.data.get('order')
        if not order_id:
            return Response({'detail': 'order is required.'}, status=status.HTTP_400_BAD_REQUEST)
        order = Order.objects.filter(pk=order_id).first()
        if not order:
            return Response({'detail': 'Order not found.'}, status=status.HTTP_404_NOT_FOUND)
        if hasattr(order, 'payment'):
            return Response({'detail': 'Payment already exists for this order.'}, status=status.HTTP_400_BAD_REQUEST)
        payment_method = request.data.get('payment_method', 'Cash on Pickup')
        payment = Payment.objects.create(
            order=order,
            user=request.user,
            payment_method=payment_method,
            amount=order.total,
            status='Pending',
        )
        return Response(PaymentSerializer(payment).data, status=status.HTTP_201_CREATED)
