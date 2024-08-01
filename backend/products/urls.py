from django.urls import path
from . import views

urlpatterns = [
    path("", views.Products.as_view()),
    path("ranking", views.ProductRanking.as_view()),
    path("<int:id>/", views.ProductDetail.as_view()),
]