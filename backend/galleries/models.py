from django.db import models
from users.models import UserGallery
from datetime import timedelta, datetime

# Create your models here.
class Gallery(models.Model):
    image = models.ImageField(upload_to="gallery/")
    title = models.CharField(max_length=100)
    upload_date = models.DateField(auto_now_add=True)
    is_personal_background = models.BooleanField(default=False)
    personal_background = models.ImageField(upload_to="personal_background/", null=True, blank=True)
    private = models.BooleanField(default=False)
    type = models.ForeignKey("categories.CategoryType", on_delete=models.SET_NULL, null=True, blank=True, related_name="galleries")
    common_background = models.ForeignKey("backgrounds.Background", on_delete=models.SET_NULL, null=True, blank=True)
    category = models.ForeignKey("categories.Category", on_delete=models.SET_NULL, null=True, blank=True, related_name="galleries")
    user = models.ForeignKey("users.User", on_delete=models.SET_NULL, null=True, blank=True, related_name="my_galleries")

    def __str__(self):
        return f"{self.title} - {self.user}"


    def like_count(self):
        count = self.like_users.count()
        return count
    
    def weekly_like(self):
        now = datetime.now().date()
        start = now - timedelta(days=7)
        return UserGallery.objects.filter(gallery=self, date__gte=start).count()
    