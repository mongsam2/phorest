from django.db import models

# Create your models here.
class Category(models.Model):
    "갤러리 또는 굿즈가 가질 수 있는 카테고리 (반려동물, 바다 ,산...)"

    name = models.CharField(max_length=20) # 카테고리 이름
    recommend = models.BooleanField() # 우리 서비스에서 추천하는 카테고리인지 여부
    types = models.ManyToManyField('categories.CategoryType') # 사진 카테고리인지, 일러스트 카테고리인지

    def __str__(self):
        return f"{self.name}"


class CategoryType(models.Model):
    "카테고리의 타입 (사진인지 일러스트인지)"
    
    name = models.CharField(max_length=20, unique=True) # 사진 or 일러스트

    def __str__(self):
        return self.name