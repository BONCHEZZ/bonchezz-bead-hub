from decimal import Decimal

from django.core import mail
from django.test import TestCase, override_settings
from rest_framework.test import APIClient

from django.urls import reverse

from accounts.models import User
from cart.models import Cart, CartItem
from categories.models import Category
from orders.models import Order
from products.models import Product


@override_settings(EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend')
class OrderStatusUpdateTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_user(
            student_email='admin@example.com',
            password='password123',
            full_name='Admin User',
            phone_number='0712345678',
            is_staff=True,
            is_superuser=True,
        )
        self.user = User.objects.create_user(
            student_email='customer@example.com',
            password='password123',
            full_name='Customer One',
            phone_number='0712345678',
        )
        self.order = Order.objects.create(
            user=self.user,
            order_number='ABC12345',
            subtotal=Decimal('100.00'),
            delivery_fee=Decimal('150.00'),
            total=Decimal('250.00'),
            pickup_location='Main Gate',
        )

    def test_admin_can_change_order_status_from_pending(self):
        self.client.force_authenticate(user=self.admin_user)

        response = self.client.patch(
            reverse('order-detail', kwargs={'pk': self.order.pk}),
            {'status': 'Confirmed'},
            format='json',
        )

        self.assertEqual(response.status_code, 200)
        self.order.refresh_from_db()
        self.assertEqual(self.order.order_status, 'Confirmed')


@override_settings(EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend')
class CheckoutEmailTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            student_email='customer@example.com',
            password='password123',
            full_name='Customer One',
            phone_number='0712345678',
        )
        self.category = Category.objects.create(name='Beads')
        self.product = Product.objects.create(
            name='Glass Beads',
            description='Colorful beads',
            price=Decimal('120.00'),
            stock_quantity=10,
            category=self.category,
        )
        self.cart = Cart.objects.create(user=self.user)
        CartItem.objects.create(cart=self.cart, product=self.product, quantity=2)

    def test_checkout_sends_order_confirmation_email(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.post(
            '/api/orders/checkout/',
            {
                'pickup_location': 'Main Gate',
                'payment_method': 'Cash on Pickup',
            },
            format='json',
        )

        self.assertEqual(response.status_code, 201)
        self.assertGreaterEqual(len(mail.outbox), 1)
        self.assertTrue(any(message.to == [self.user.student_email] for message in mail.outbox))
        confirmation_message = next(message for message in mail.outbox if message.to == [self.user.student_email])
        self.assertIn('Order confirmation', confirmation_message.subject)
        self.assertIn('Main Gate', confirmation_message.body)
        self.assertTrue(Order.objects.filter(user=self.user).exists())
