from rest_framework.views import APIView
from .serializers import GalleryListSerializer, GallerySerializer
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Gallery
from categories.models import Category, CategoryType
from backgrounds.models import Background

from rest_framework.exceptions import ParseError, NotFound
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Create your views here.
class Galleries(APIView):
    parser_classes = [MultiPartParser]
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        type_name = request.query_params.get("type")
        category_name = request.query_params.get("category")
        page = request.query_params.get("page", "1")

        if not type_name:
            raise ParseError("타입 정보가 입력되지 않았습니다.")
        try:
            type = CategoryType.objects.get(name=type_name)
        except CategoryType.DoesNotExist:
            raise NotFound("해당 타입이 존재하지 않습니다.")
        
        if not category_name:
            raise ParseError("카테고리 정보가 입력되지 않았습니다.")
        try:
            category = Category.objects.get(name=category_name, types=type)
        except Category.DoesNotExist:
            raise NotFound("해당 카테고리가 존재하지 않습니다.")
        
        galleries = Gallery.objects.filter(type=type, category=category).exclude(private=True)
        serializer = GalleryListSerializer(galleries, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        type_name = data["type"]
        category_name = data["category"]
        try:
            type = CategoryType.objects.get(name=type_name)
        except CategoryType.DoesNotExist:
            raise NotFound("해당 타입이 존재하지 않습니다.")
        try:
            category = Category.objects.get(types=type, name=category_name)
        except Category.DoesNotExist:
            raise NotFound("해당 카테고리가 존재하지 않습니다.")
        
        serializer = GallerySerializer(data=data)
        if serializer.is_valid():
            if data["personal_background"] and not data["common_background"]:
                gallery = serializer.save(category=category, type=type, is_personal_background=True, user=request.user)
            elif data["common_background"] and not data["personal_background"]:
                try:
                    background = Background.objects.get(id=data["common_background"])
                except Background.DoesNotExist:
                    raise NotFound("입력한 id를 가진 배경사진이 존재하지 않습니다.")
                gallery = serializer.save(category=category, type=type, is_personal_background=False, common_background=background, user=request.user)
            return Response({"gallery_id":gallery.id})
        else:
            return Response({"detail":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        

        

        