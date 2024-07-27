from django.contrib import admin
from .models import Product, ProductImage

# Register your models here.
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "release_date",
        "price",
        "gallery",
    )   

@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    pass