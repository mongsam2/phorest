from django.contrib import admin
from .models import Gallery
from users.admin import LikeGalleryInline

# Register your models here.
@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    inlines = (LikeGalleryInline,)
    list_display = (
        "title",
        "user",
        "upload_date",
        "type",
        "category",
        "private",
        "like_count",
        "weekly_like"
    )