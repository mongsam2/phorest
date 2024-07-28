from rest_framework.serializers import ModelSerializer
from .models import Gallery

class GalleryListSerializer(ModelSerializer):

    class Meta:
        model = Gallery
        fields = ("image", "background_image", "title", "upload_date", "profile_image")