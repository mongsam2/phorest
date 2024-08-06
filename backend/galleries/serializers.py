from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Gallery
from django.conf import settings

class GalleryListSerializer(ModelSerializer):
    background_image = SerializerMethodField()
    image = SerializerMethodField()
    profile_image = SerializerMethodField()
    like = SerializerMethodField()

    class Meta:
        model = Gallery
        fields = ("image", "background_image","title", "upload_date", "profile_image", "like")


    def get_image(self, gallery):
        return settings.BASE_URL + settings.MEDIA_URL + str(gallery.image)

    def get_background_image(self, gallery):
        if gallery.common_background == None:
            return ""
        image_url = str(gallery.common_background.image)
        return settings.BASE_URL + settings.MEDIA_URL + image_url
    
    def get_profile_image(self, gallery):
        if gallery.user.profile_image != None:
            return settings.BASE_URL + settings.MEDIA_URL + str(gallery.user.profile_image)
        else:
            return None
    
    def get_like(self, gallery):
        request = self.context["request"]
        if not request.user.is_authenticated:
            return False
        if request.user.like_gallery.filter(id=gallery.id).exists():
            return True
        else:
            return False
        
        
class GallerySmallSerializer(ModelSerializer):
    image = SerializerMethodField()
    profile_image = SerializerMethodField()
    like = SerializerMethodField()

    class Meta:
        model = Gallery
        fields = ("id", "image", "title", "upload_date", "profile_image", "like")

    def get_image(self, gallery):
        return settings.BASE_URL + settings.MEDIA_URL + str(gallery.image)
    
    def get_profile_image(self, gallery):
        if gallery.user.profile_image != None:
            return settings.BASE_URL + settings.MEDIA_URL + str(gallery.user.profile_image)
        else:
            return None
    
    def get_like(self, gallery):
        return gallery.like_users.all().count()
        
        
class GallerySerializer(ModelSerializer):
    image = SerializerMethodField()
    like = SerializerMethodField()
    background_image = SerializerMethodField()

    class Meta:
        model = Gallery
        fields = ("image", "title", "like", "background_image", "upload_date", "profile_image")

    def get_like(self, gallery):
        request = self.context["request"]
        if not request.user.is_authenticated:
            return False
        if request.user.like_gallery.filter(id=gallery.id).exists():
            return True
        else:
            return False
    
    def get_background_image(self, gallery):
        if gallery.is_personal_background:
            image_url = str(gallery.personal_background)
        else:
            image_url = str(gallery.common_background.image)
        return settings.BASE_URL + settings.MEDIA_URL + image_url
    
    def get_profile_image(self, gallery):
        if gallery.user.profile_image != None:
            return settings.BASE_URL + settings.MEDIA_URL + str(gallery.user.profile_image)
        else:
            return None
    
    

class GalleryPutSerializer(ModelSerializer):

    class Meta:
        model = Gallery
        fields = ("title",)

class GalleryRankingSerializer(ModelSerializer):
    profile_image = SerializerMethodField()
    image = SerializerMethodField()

    class Meta:
        model = Gallery
        fields = ("image", "title", "profile_image")

    def get_profile_image(self, gallery):
        if gallery.user.profile_image != None:
            return settings.BASE_URL + settings.MEDIA_URL + str(gallery.user.profile_image)
        else:
            return None
        
    
    def get_image(self, gallery):
        return settings.BASE_URL + settings.MEDIA_URL + str(gallery.image)