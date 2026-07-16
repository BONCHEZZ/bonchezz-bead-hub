from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import BusinessSettings
from .serializers import BusinessSettingsSerializer


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
