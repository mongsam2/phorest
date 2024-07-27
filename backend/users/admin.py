from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin

# Register your models here.
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ("username", "email", "is_staff", "date_joined")
    fieldsets = (
        ("기본정보", 
         {"fields": (
            "username", 
            "password", 
            "email", 
            "address", 
            "profile_image", 
            "login_path", 
            "is_sms_subscribed",
            "is_email_subscribed",
            "is_verified",
            "product_likes",
            "gallery_likes",
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