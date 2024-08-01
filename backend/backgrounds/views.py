from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import BackgroundsListSerializer
from .models import Background

# Create your views here.
class Backgrounds(APIView):

    def get(self, request):
        backgrounds = Background.objects.all()
        serializer = BackgroundsListSerializer(backgrounds, many=True)
        return Response(serializer.data)