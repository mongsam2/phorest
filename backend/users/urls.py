from django.urls import path
from . import views

urlpatterns = [
    path("", views.Users.as_view()),
    path('my-profile/', views.UserDetail.as_view()),
    path("my-galleries/", views.MyGalleries.as_view()),
    path('like-galleries/', views.LikeGalleries.as_view()),
]