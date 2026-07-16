from django.urls import path
from .views import ProductListView, ProductDetailView, ProductImageUploadView

urlpatterns = [
    path('', ProductListView.as_view(), name='product-list'),
    path('<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('<int:pk>/upload-images/', ProductImageUploadView.as_view(), name='product-image-upload'),
]
