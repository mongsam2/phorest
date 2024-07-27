from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    "username은 AbstractUser에 이미 존재"
    "password는 AbstactUser애 이미 존재"

    class LoginPathChoices(models.TextChoices):
        COMMON = ("common", "일반")
        KAKAO = ("kakao", "카카오")
        GOOGLE = ("google", "구글")
        NAVER = ("naver", "네이버")

    phone = models.CharField(max_length=13)
    email = models.EmailField(unique=True)
    address = models.CharField(max_length=100, null=True, blank=True)
    profile_image = models.ImageField(upload_to="profile", null=True, blank=True)
    login_path = models.CharField(max_length=6, choices=LoginPathChoices, default=LoginPathChoices.COMMON)
    is_sms_subscribed = models.BooleanField(default=False)
    is_email_subscribed = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    product_likes = models.ManyToManyField("products.Product", related_name="like_users", null=True, blank=True)
    gallery_likes = models.ManyToManyField("galleries.Gallery", related_name="like_users", null=True, blank=True)


    def __str__(self):
        return self.username