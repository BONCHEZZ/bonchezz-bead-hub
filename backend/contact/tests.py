from unittest.mock import patch

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class ContactMessageEmailTests(APITestCase):
    def test_contact_message_sends_email(self):
        url = reverse('contact-message-list-create')
        payload = {
            'name': 'Jane Doe',
            'email': 'jane@example.com',
            'message': 'Hello from the test suite.',
        }

        with patch('contact.views.send_mail') as mock_send_mail:
            response = self.client.post(url, payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        mock_send_mail.assert_called_once()
        self.assertEqual(mock_send_mail.call_args[1]['recipient_list'], ['derrickbonche9@gmail.com'])
