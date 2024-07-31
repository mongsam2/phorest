from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Product
from django.conf import settings

class ProductListSerializer(ModelSerializer):
    image = SerializerMethodField()

    class Meta:
        model = Product
        fields = ("id", "name", "price", "image")

    def get_image(self, gallery):
        return settings.BASE_URL + settings.MEDIA_URL + str(gallery.image)