from django.urls import path
from . import views

urlpatterns = [
    path("", views.Galleries.as_view()),
    path("<int:id>/", views.GalleryDetail.as_view()),
    path("ranking/", views.GalleryRanking.as_view()),
    path("like/<int:id>/", views.GalleryLike.as_view()),
]