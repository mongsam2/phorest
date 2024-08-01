from django.urls import path
from . import views

urlpatterns = [
    path("", views.Users.as_view()),
    path('my-profile', views.UserDetail.as_view()),
]