from django.db.models import Q
from rest_framework import filters, generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Product, ProductImage
from .serializers import ProductSerializer


class ProductListView(generics.ListCreateAPIView):
    queryset = Product.objects.all().select_related('category')
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'category__name']
    ordering_fields = ['price', 'created_at', 'rating']

    def get_permissions(self):
        if self.request.method in ['POST', 'PUT', 'PATCH', 'DELETE']:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

    def get_queryset(self):
        queryset = Product.objects.all().select_related('category')
        category = self.request.query_params.get('category')
        featured = self.request.query_params.get('featured')
        latest = self.request.query_params.get('latest')
        if category:
            queryset = queryset.filter(category__name__icontains=category)
        if featured == 'true':
            queryset = queryset.filter(featured=True)
        if latest == 'true':
            queryset = queryset.order_by('-created_at')
        return queryset


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all().select_related('category')
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]


class ProductImageUploadView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, pk):
        product = Product.objects.filter(pk=pk).first()
        if not product:
            return Response({'detail': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)
        images = request.FILES.getlist('images')
        for image in images:
            ProductImage.objects.create(product=product, image=image)
        return Response({'detail': 'Images uploaded successfully.'}, status=status.HTTP_201_CREATED)
