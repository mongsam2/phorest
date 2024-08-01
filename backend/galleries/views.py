from rest_framework.views import APIView
from .serializers import GalleryListSerializer, GallerySerializer, GalleryPutSerializer, GalleryRankingSerializer
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser

from .models import Gallery
from categories.models import Category, CategoryType
from backgrounds.models import Background

from rest_framework.exceptions import ParseError, NotFound, PermissionDenied
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from django.db.models import Count, Q
from datetime import timedelta, datetime

# Create your views here.
class Galleries(APIView):
    parser_classes = [MultiPartParser]
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        type_name = request.query_params.get("type")
        category_name = request.query_params.get("category")
        page = int(request.query_params.get("page", "1"))

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
        
        galleries = Gallery.objects.filter(type=type, category=category).exclude(private=True)[(page-1)*5:page*5]
        serializer = GalleryListSerializer(galleries, many=True, context={"request":request})
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
            else:
                raise ParseError("기본 배경사진과 개인 배경사진 중, 하나만 입력해주세요.")
            return Response({"gallery_id":gallery.id})
        else:
            return Response({"detail":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class GalleryDetail(APIView):
    parser_classes = [MultiPartParser]
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self, id):
        try:
            gallery = Gallery.objects.get(id=id)
        except Gallery.DoesNotExist:
            raise NotFound("입력한 id를 가진 갤러리가 존재하지 않습니다.")
        return gallery

    def get(self, request, id):
        pass

    def put(self, request, id):
        gallery = self.get_object(id)
        if gallery.user != request.user:
            raise PermissionDenied("작품을 수정할 권한이 없습니다.")
        
        data = request.data
        if "type" in data or "category" in data:
            raise ParseError("타입과 카테고리는 수정할 수 없습니다.")
        if "image" in data:
            raise ParseError("업로드한 작품 이미지는 수정할 수 없습니다.")
        
        serializer = GalleryPutSerializer(gallery, data=data)
        if serializer.is_valid():
            if data["personal_background"] and not data["common_background"]:
                gallery.common_background=None
                gallery = serializer.save(is_personal_background=True)
            elif data["common_background"] and not data["personal_background"]:
                try:
                    background = Background.objects.get(id=data["common_background"])
                except Background.DoesNotExist:
                    raise NotFound("입력한 id를 가진 배경사진이 존재하지 않습니다.")
                gallery = serializer.save(is_personal_background=False, common_background=background)
            else:
                raise ParseError("기본 배경사진과 개인 배경사진 중, 하나만 입력해주세요.")
            return Response({"detail":"업데이트 완료"})
        else:
            return Response({"detail":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        

class GalleryRanking(APIView):

    def get(self, request):
        type_name = request.query_params.get("type")
        category_name = request.query_params.get("category")
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
        
        start = datetime.now().date() - timedelta(days=7)
        galleries = Gallery.objects.annotate(likes_last_week=Count('like_users', filter=Q(usergallery__date__gte=start))).order_by("-likes_last_week")[:6]
        serializer = GalleryRankingSerializer(galleries, many=True)
        return Response(serializer.data)


class GalleryLike(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id):
        try:
            gallery = Gallery.objects.get(id=id)
        except Gallery.DoesNotExist:
            raise NotFound("해당 id를 가진 작품이 존재하지 않습니다.")
        if request.user.like_gallery.filter(id=gallery.id).exists():
            request.user.like_gallery.remove(request.user.like_gallery.get(id=gallery.id))
            return Response({"detail":"클릭! 좋아요를 지웠어요!"})
        else:
            request.user.like_gallery.add(gallery)
            request.user.save()
            return Response({"detail":"클릭! 좋아요를 눌렀어요!"})

