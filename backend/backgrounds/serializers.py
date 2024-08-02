from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Background
from django.conf import settings

class BackgroundsListSerializer(ModelSerializer):
    image = SerializerMethodField()

    class Meta:
        model = Background
        fields = "__all__"

    def get_image(self, gallery):
        return settings.BASE_URL + settings.MEDIA_URL + str(gallery.image)