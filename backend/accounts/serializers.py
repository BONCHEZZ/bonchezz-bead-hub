from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'full_name', 'student_email', 'phone_number', 'is_active', 'date_joined']
        read_only_fields = ['id', 'date_joined', 'is_active']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ['full_name', 'student_email', 'phone_number', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['student_email'],
            full_name=validated_data['full_name'],
            student_email=validated_data['student_email'],
            phone_number=validated_data['phone_number'],
            password=validated_data['password'],
        )
        return user


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])
