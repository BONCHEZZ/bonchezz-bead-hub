import logging

from django.core.mail import send_mail
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import ContactMessage
from .serializers import ContactMessageSerializer

logger = logging.getLogger(__name__)


class ContactMessageListCreateView(generics.ListCreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    pagination_class = None

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        if response.status_code == status.HTTP_201_CREATED:
            serializer = response.data
            try:
                send_mail(
                    subject='New contact message from Bonchezz website',
                    message=(
                        f"Name: {serializer.get('name', '')}\n"
                        f"Email: {serializer.get('email', '')}\n\n"
                        f"Message:\n{serializer.get('message', '')}"
                    ),
                    from_email=None,
                    recipient_list=['derrickbonche9@gmail.com'],
                    fail_silently=False,
                )
            except Exception:
                logger.exception('Failed to send contact message email')
        return response


class ContactMessageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.IsAdminUser]
