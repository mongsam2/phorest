from django.urls import path
from . import views

urlpatterns = [
    path("recommend/", views.RecommendCategories.as_view()),
    path("", views.Categories.as_view())
]