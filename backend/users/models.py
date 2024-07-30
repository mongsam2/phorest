from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class UserGallery(models.Model):
    user = models.ForeignKey("users.User", on_delete=models.CASCADE)
    gallery = models.ForeignKey("galleries.Gallery", on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.date}"

class UserProduct(models.Model):    
    user = models.ForeignKey("users.User", on_delete=models.CASCADE)
    product = models.ForeignKey("products.Product", on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)



class User(AbstractUser):
    "username은 AbstractUser에 이미 존재"
    "password는 AbstactUser애 이미 존재"

    class LoginPathChoices(models.TextChoices):
        COMMON = ("common", "일반")
        KAKAO = ("kakao", "카카오")
        GOOGLE = ("google", "구글")
        NAVER = ("naver", "네이버")

    name = models.CharField(max_length=20, default="---")
    phone = models.CharField(max_length=13)
    email = models.EmailField(unique=True)
    address = models.CharField(max_length=100, null=True, blank=True)
    profile_image = models.ImageField(upload_to="profile", null=True, blank=True)
    login_path = models.CharField(max_length=6, choices=LoginPathChoices, default=LoginPathChoices.COMMON)
    subscribed = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    like_gallery = models.ManyToManyField("galleries.Gallery", through=UserGallery, related_name="like_users")
    like_product = models.ManyToManyField("products.Product", through=UserProduct, related_name="like_users")


    def __str__(self):
        return self.username
    

