from django.contrib import admin
from .models import Category, CategoryType

# Register your models here.
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("__str__", "recommend")


@admin.register(CategoryType)
class CategoryTypeAdmin(admin.ModelAdmin):
    pass