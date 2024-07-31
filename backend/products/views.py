from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Product
from django.db.models import Count, Q
from categories.models import Category

from .serializers import ProductListSerializer

from rest_framework.exceptions import NotFound

# Create your views here.
class Products(APIView):

    def get(self, request):
        category_name = request.query_params.get("category")
        page = int(request.query_params.get("page", "1"))
        size = 10
        sort = request.query_params.get("sort", "최신순")

        try:
            category = Category.objects.get(name=category_name)
        except Category.DoesNotExist:
            raise NotFound("입력한 카테고리가 존재하지 않습니다.")
        
        products = Product.objects.filter(gallery__category=category)

        if sort == "최신순":
            products = Product.objects.filter(gallery__category=category).order_by("-release_date")[(page-1)*size:page*size]
            serializer = ProductListSerializer(products, many=True)
            return Response(serializer.data)

        elif sort == "판매량순":
            products = Product.objects.annotate(orderd=Count("buyers")).filter(gallery__category=category).order_by("-orderd")[(page-1)*size:page*size]
            serializer = ProductListSerializer(products, many=True)
            return Response(serializer.data)