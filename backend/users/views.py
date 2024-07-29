from rest_framework.views import APIView
from rest_framework.response import Response

from .models import User
from .serializers import UserCreateSerializer

from rest_framework import status

# Create your views here.
class Users(APIView):
    
    def post(self, request):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save(login_path=User.LoginPathChoices.COMMON)
            return Response({"user_id":user.id})
        else:
            return Response({"detail":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)