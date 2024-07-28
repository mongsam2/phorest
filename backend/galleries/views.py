from rest_framework.views import APIView
from .serializers import GalleryListSerializer
from rest_framework.response import Response

from .models import Gallery

from rest_framework.exceptions import ParseError

# Create your views here.
class Galleries(APIView):

    def get(self, request):
        type = request.query_params.get("type")
        category = request.query_params.get("category")
        page = request.query_params.get("page", "1")
        if not type:
            raise ParseError("타입 정보가 입력되지 않았습니다.")
        if not category:
            raise ParseError("카테고리 정보가 입력되지 않았습니다.")
        
        galleries = Gallery.objects.filter(type__name=type, category__name=category)
        serializer = GalleryListSerializer(galleries, many=True)
        return Response(serializer.data)

    def post(self, request):
        pass