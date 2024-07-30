from django.urls import path
from . import views

urlpatterns = [
    path("", views.Galleries.as_view()),
    path("<id:int>/", views.GalleryDetail.as_view()),
]