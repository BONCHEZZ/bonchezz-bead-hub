import logging
from uuid import uuid4

import requests
from django.conf import settings
from django.core.mail import send_mail
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import filters, generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from cart.models import Cart
from payments.models import Payment

from .models import Order, OrderItem
from .serializers import OrderSerializer

logger = logging.getLogger(__name__)


def send_order_status_email(order, new_status):
    recipient = getattr(order.user, 'student_email', None)
    if not recipient:
        return

    subject = f'Order status update #{order.order_number}'
    message = (
        f'Dear {order.user.full_name or recipient},\n\n'
        f'Your order {order.order_number} status has been updated to {new_status}.\n\n'
        'Thank you for shopping with Bonchezz Bead Hub.'
    )
    logger.info('Sending order status email to %s', recipient)
    try:
        send_mail(subject, message, None, [recipient], fail_silently=False)
    except Exception:
        logger.exception('Failed to send order status email to %s', recipient)


def send_sms_via_provider(phone_number, message):
    if not phone_number:
        return

    digits = ''.join(ch for ch in phone_number if ch.isdigit())
    if not digits:
        return

    sms_provider = getattr(settings, 'SMS_PROVIDER', '').strip().lower()
    twilio_account_sid = getattr(settings, 'TWILIO_ACCOUNT_SID', '').strip()
    twilio_auth_token = getattr(settings, 'TWILIO_AUTH_TOKEN', '').strip()
    twilio_from_number = getattr(settings, 'TWILIO_FROM_NUMBER', '').strip()

    if sms_provider != 'twilio' or not twilio_account_sid or not twilio_auth_token or not twilio_from_number:
        logger.info('Twilio SMS provider not configured; skipping SMS for %s', digits)
        return

    try:
        response = requests.post(
            f'https://api.twilio.com/2010-04-01/Accounts/{twilio_account_sid}/Messages.json',
            auth=(twilio_account_sid, twilio_auth_token),
            data={
                'To': f'+{digits}',
                'From': twilio_from_number,
                'Body': message,
            },
            timeout=10,
        )
        response.raise_for_status()
        logger.info('SMS sent successfully to %s', digits)
    except Exception:
        logger.exception('Failed to send SMS via Twilio to %s', digits)


class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        qs = Order.objects.filter(user=self.request.user)
        if self.request.user.is_staff or self.request.user.is_superuser:
            qs = Order.objects.all()
        return qs.select_related('user', 'payment')


class OrderDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = Order.objects.filter(user=self.request.user)
        if self.request.user.is_staff or self.request.user.is_superuser:
            qs = Order.objects.all()
        return qs.select_related('user', 'payment')

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        user = request.user
        if not (user.is_staff or user.is_superuser):
            return Response({'detail': 'Not authorized.'}, status=status.HTTP_403_FORBIDDEN)
        try:
            data = request.data.copy()
        except Exception:
            data = dict(request.data)
        if 'status' in data:
            data['status'] = data.pop('status')
        allowed_fields = {'status', 'payment_status', 'delivery_status', 'order_status'}
        data = {k: v for k, v in data.items() if k in allowed_fields}
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        previous_status = instance.order_status
        self.perform_update(serializer)
        new_status = serializer.instance.order_status
        if previous_status != new_status:
            send_order_status_email(serializer.instance, new_status)
        return Response(serializer.data)


class CheckoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        cart = get_object_or_404(Cart, user=request.user)
        if not cart.items.exists():
            return Response({'detail': 'Cart is empty.'}, status=status.HTTP_400_BAD_REQUEST)

        subtotal = sum(item.product.price * item.quantity for item in cart.items.all())
        delivery_fee = 150
        total = subtotal + delivery_fee
        pickup_location = request.data.get('pickup_location', '')
        payment_method = request.data.get('payment_method', 'Cash on Pickup')
        order = Order.objects.create(
            user=request.user,
            order_number=str(uuid4())[:8].upper(),
            subtotal=subtotal,
            delivery_fee=delivery_fee,
            total=total,
            pickup_location=pickup_location,
        )
        for item in cart.items.all():
            OrderItem.objects.create(order=order, product=item.product, quantity=item.quantity, price=item.product.price)
        cart.items.all().delete()
        Payment.objects.create(
            order=order,
            user=request.user,
            payment_method=payment_method,
            amount=total,
            status='Pending',
        )

        try:
            subject = f'Order confirmation #{order.order_number}'
            items_text = '\n'.join(
                f'- {item.quantity} x {item.product.name} (@ {item.price})' for item in order.items.all()
            )
            message = (
                f'Dear {request.user.full_name or request.user.student_email},\n\n'
                f'Your order {order.order_number} has been received.\n\n'
                f'Pickup location: {pickup_location or "Not provided"}\n'
                f'Payment method: {payment_method}\n'
                f'Total: {order.total}\n\n'
                'Items:\n'
                f'{items_text}\n\n'
                'Thank you for shopping with Bonchezz Bead Hub.'
            )
            logger.info('Sending order confirmation email to %s', request.user.student_email)
            send_mail(
                subject,
                message,
                None,
                [request.user.student_email],
                fail_silently=False,
            )
            send_sms_via_provider(request.user.phone_number, f'Order {order.order_number} received. Pickup: {pickup_location or "Not provided"}')
        except Exception:
            logger.exception('Failed to send order confirmation email for order %s', order.order_number)

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
