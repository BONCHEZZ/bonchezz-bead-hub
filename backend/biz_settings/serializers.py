from rest_framework import serializers, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import BusinessSettings


class BusinessSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessSettings
        fields = ['id', 'business_name', 'logo_url', 'phone', 'email', 'description', 'pickup_location', 'instagram', 'tiktok', 'whatsapp', 'updated_at']


class BusinessSettingsView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        obj = BusinessSettings.get_solo()
        return Response(BusinessSettingsSerializer(obj).data)

    def patch(self, request):
        obj = BusinessSettings.get_solo()
        serializer = BusinessSettingsSerializer(obj, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
