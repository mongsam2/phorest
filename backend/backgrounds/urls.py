from django.urls import path
from . import views

urlpatterns = [
    path("", views.Backgrounds.as_view())
]