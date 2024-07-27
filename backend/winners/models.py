from django.db import models
from datetime import timedelta

# Create your models here.
class Winner(models.Model):
    rank = models.PositiveIntegerField()
    win_date = models.DateField()
    weekly_like = models.PositiveIntegerField(null=True, blank=True)
    gallery = models.ForeignKey("galleries.Gallery", on_delete=models.CASCADE, related_name="winners")

    def __str__(self):
        return f"{self.gallery}"
    
    def weekly_likes(self):
        start_date = self.win_date - timedelta(weeks=1)
        # 일주일 동안 받은 좋아요 개수 계산
        return start_date
