from rest_framework.serializers import ModelSerializer
from .models import User

class UserCreateSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ("email", "password", "name", "phone", "username")

class UserDetailSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ("name", "phone","email", "address", "profile_image", "subscribed", "is_verified")