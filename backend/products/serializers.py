from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Product
from django.conf import settings

class ProductListSerializer(ModelSerializer):
    image = SerializerMethodField()
    total_sales = SerializerMethodField()
    name = SerializerMethodField()

    class Meta:
        model = Product
        fields = ("id", "name", "price", "image", "total_sales")

    def get_image(self, product):
        return settings.BASE_URL + settings.MEDIA_URL + str(product.image)
    
    def get_total_sales(self, product):
        total = 0
        for element in product.shopping_list.all():
            total += element.count
        return total
    
    def get_name(self, product):
        if len(product.name) > 10:
            return product.name[:10] + "..."
        return product.name

class ProductDetailSerializer(ModelSerializer):
    image = SerializerMethodField()

    class Meta:
        model = Product
        exclude = ("id", "gallery")

    def get_image(self, product):
        return settings.BASE_URL + settings.MEDIA_URL + str(product.image)