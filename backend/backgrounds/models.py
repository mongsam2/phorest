from django.db import models

# Create your models here.
class Background(models.Model):
    image = models.ImageField(upload_to="background/")

    def __str__(self):
        return f"배경사진 {self.id}"