from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Product
from django.db.models import Count, Q, Sum
from categories.models import Category

from .serializers import ProductListSerializer, ProductDetailSerializer

from rest_framework.exceptions import NotFound

# Create your views here.
class Products(APIView):

    def get(self, request):
        category_name = request.query_params.get("category", "전체")
        page = int(request.query_params.get("page", "1"))
        size = 10
        sort = request.query_params.get("sort", "최신순")

        if category_name == "전체":
            if sort == "최신순":
                products = Product.objects.all().order_by("-release_date")[(page-1)*size:page*size]
                serializer = ProductListSerializer(products, many=True)
                return Response(serializer.data)

            elif sort == "판매량순":
                products = Product.objects.annotate(orderd=Sum("shopping_list__count")).all().order_by("-orderd")[(page-1)*size:page*size]
                serializer = ProductListSerializer(products, many=True)
                return Response(serializer.data)
        
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
            products = Product.objects.annotate(orderd=Sum("shopping_list__count")).filter(gallery__category=category).order_by("-orderd")[(page-1)*size:page*size]
            serializer = ProductListSerializer(products, many=True)
            return Response(serializer.data)
        
class ProductRanking(APIView):

    def get(self, request):
        products = Product.objects.annotate(orderd=Sum("shopping_list__count")).order_by("-orderd")[:3]
        serializer = ProductListSerializer(products, many=True)
        return Response(serializer.data)

class ProductDetail(APIView):

    def get(self, request, id):
        try:
            product = Product.objects.get(id=id)
        except Product.DoesNotExist:
            raise NotFound("해당 id를 가진 상품이 존재하지 않습니다.")
        serializer = ProductDetailSerializer(product)
        return Response(serializer.data)
        