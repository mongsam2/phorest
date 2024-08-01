from django.db import models
from django.db.models import Sum

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=100)
    release_date = models.DateField(auto_now_add=True)
    description = models.TextField(null=True, blank=True)
    price = models.PositiveIntegerField()
    gallery = models.ForeignKey('galleries.Gallery', on_delete=models.SET_NULL, null=True, blank=True, related_name="products")
    image = models.ImageField(upload_to="goods", null=True, blank=True)

    def __str__(self):
        return self.name
    
    def sales(self):
        total = 0
        for element in self.shopping_list.all():
            total += element.count
        return total


class ProductImage(models.Model):
    image = models.ImageField(upload_to="product/")
    product = models.ForeignKey("products.Product", on_delete=models.CASCADE, related_name="product_images")

    def __str__(self):
        return f"{self.product}의 이미지"

