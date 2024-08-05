from django.contrib import admin
from .models import User, UserGallery, UserProduct
from django.contrib.auth.admin import UserAdmin
from .models import UserGallery, UserProduct

# Register your models here.
class LikeGalleryInline(admin.TabularInline):
    model = UserGallery

class LikeProductInline(admin.TabularInline):
    model = UserProduct

@admin.register(UserProduct)
class UserProductAdmin(admin.ModelAdmin):
    list_display = ("user", "product", "date", "delivery", "count")

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    inlines = (LikeGalleryInline, LikeProductInline)
    list_display = ("username", "nickname", "email", "is_staff", "date_joined")
    fieldsets = (
        ("기본정보", 
         {"fields": (
            "username",
            "nickname",
            "name", 
            "password", 
            "email",
            "phone", 
            "address", 
            "profile_image", 
            "login_path", 
            "subscribed",
            "is_verified",
            )
        }
        ),
        (
            ("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                ),
            },
        ),
        (("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    '''
    email
address
profile_image
login_path
is_sms_subscribed
is_email_subscribed
is_verified
    '''