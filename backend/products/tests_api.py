from django.test import TestCase
from django.urls import reverse


class ProductApiTests(TestCase):
    def test_product_list_endpoint(self):
        response = self.client.get(reverse("product-list"))
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertIn("results", payload)
