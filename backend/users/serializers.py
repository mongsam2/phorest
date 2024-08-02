from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import User
from django.conf import settings

class UserCreateSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ("email", "password", "name", "phone", "username")

class UserDetailSerializer(ModelSerializer):
    profile_image = SerializerMethodField()

    class Meta:
        model = User
        fields = ("username", "name", "phone","email", "address", "profile_image", "subscribed", "is_verified")

    def get_profile_image(self, user):
        if user.profile_image:
            return settings.BASE_URL + settings.MEDIA_URL + str(user.profile_image)
        else:
            return None

class UserPutSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ("username", "name", "phone","email", "address", "profile_image", "subscribed", "is_verified")