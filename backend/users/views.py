from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import login, authenticate, logout

from .models import User
from .serializers import UserCreateSerializer

from rest_framework import status
from rest_framework.exceptions import ParseError, AuthenticationFailed, NotAuthenticated

# Create your views here.
class Users(APIView):
    
    def post(self, request):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save(login_path=User.LoginPathChoices.COMMON)
            return Response({"user_id":user.id})
        else:
            return Response({"detail":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        if not email:
            raise ParseError("이메일을 입력하세요.")
        username = User.objects.get(email=email).username
        if not password:
            raise ParseError("비밀번호를 입력하세요.")
        user = authenticate(request, username=username, password=password)
        if not user:
            raise AuthenticationFailed("사용자 검증에 실패했습니다.")
        login(request, user)
        return Response({"username": user.username})
    
class UserLogout(APIView):

    def post(self, request):
        if not request.user.is_authenticated:
            raise NotAuthenticated("로그인 되어있지 않습니다.")
        logout(request)
        return Response({"detail":"로그아웃"})