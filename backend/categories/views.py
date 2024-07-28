from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Category, CategoryType

from rest_framework.exceptions import NotFound, ParseError
from django.core.exceptions import MultipleObjectsReturned

from .serializers import CategorySerializer

# Create your views here.
class RecommendCategories(APIView):

    def get(self, request):
        type_name = request.query_params.get("type")
        if not type_name:
            raise ParseError("type 정보가 없습니다.")
        
        try:
            category_type = CategoryType.objects.get(name=type_name)
        except CategoryType.DoesNotExist:
            raise NotFound("해당 type이 존재하지 않습니다.")
        
        categories = Category.objects.filter(types=category_type, recommend=True).values("name")
        serializer = CategorySerializer(categories, many=True)
        ans = []
        for element in serializer.data:
            ans.append(element["name"])
        return Response({"categories":ans})


class Categories(APIView):

    def get(self, request):
        type_name = request.query_params.get("type")
        if not type_name:
            raise ParseError("type 정보가 없습니다.")
        
        try:
            category_type = CategoryType.objects.get(name=type_name)
        except CategoryType.DoesNotExist:
            raise NotFound("해당 type이 존재하지 않습니다.")
        
        categories = Category.objects.filter(types=category_type).values("name")
        serializer = CategorySerializer(categories, many=True)
        ans = []
        for element in serializer.data:
            ans.append(element["name"])
        return Response({"categories":ans})