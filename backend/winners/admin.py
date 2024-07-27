from django.contrib import admin
from .models import Winner

# Register your models here.
@admin.register(Winner)
class WinnerAdmin(admin.ModelAdmin):
    list_display = (
        "__str__",
        "rank",
        "win_date",
        "gallery",
        "weekly_likes",
    )