from django.urls import path
from .views import ReviewListCreateView, ReviewDetailView, AdminReviewListView, AdminReviewDetailView

urlpatterns = [
    path('', ReviewListCreateView.as_view(), name='review-list'),
    path('<int:pk>/', ReviewDetailView.as_view(), name='review-detail'),
    path('admin/', AdminReviewListView.as_view(), name='admin-review-list'),
    path('admin/<int:pk>/', AdminReviewDetailView.as_view(), name='admin-review-detail'),
]
