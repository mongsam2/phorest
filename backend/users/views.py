from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import login, authenticate, logout

from .models import User
from galleries.models import Gallery
from .serializers import UserCreateSerializer, UserDetailSerializer, UserPutSerializer
from galleries.serializers import GallerySmallSerializer

from rest_framework import status
from rest_framework.exceptions import ParseError, AuthenticationFailed, NotAuthenticated

from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated

import requests
from django.shortcuts import redirect
from django.conf import settings
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

class UserDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserDetailSerializer(request.user)
        return Response(serializer.data)
    
    def put(self, request):
        user = request.user
        if user.login_path == User.LoginPathChoices.NAVER:
            request.data["nickname"] = request.data["username"]
            request.data["username"] = user.username
        serializer = UserPutSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "성공!"})
        else:
            return Response({"detail":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
class MyGalleries(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        page = int(request.query_params.get("page", "1"))
        size = 3
        my_gallery = Gallery.objects.filter(user=request.user)[(page-1)*size:page*size]
        serializer = GallerySmallSerializer(my_gallery, many=True)
        return Response(serializer.data)

class LikeGalleries(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        page = int(request.query_params.get("page", "1"))
        size = 3
        like_gallery = Gallery.objects.filter(like_users=request.user)[(page-1)*size:page*size]
        serializer = GallerySmallSerializer(like_gallery, many=True)
        return Response(serializer.data)
    
class NaverLogin(APIView):

    def get(self, request):
        data = {
            "response_type": "code",
            "client_id": "haPvI0_b0I62nZAD5CM5",
            "redirect_uri": "http://3.39.26.152:8000//naver-login",
            "state": settings.SECRET_KEY
        }

        url = (
            f"https://nid.naver.com/oauth2.0/authorize?"
            f"response_type={data['response_type']}&"
            f"client_id={data['client_id']}&"
            f"state={data['state']}&"
            f"redirect_uri={data['redirect_uri']}"
        )

        # Redirect the user to the Naver login URL
        return redirect(url)
    
class NaverLoginCallbackView(APIView):
    def get(self, request):
        code = request.query_params["code"]
        state = request.query_params["state"]
        print(code, state)

        if not code or state != settings.SECRET_KEY:
            return Response({"error": "Invalid state or code"}, status=status.HTTP_400_BAD_REQUEST)
        
        token_url = "https://nid.naver.com/oauth2.0/token"
        data = {
            "grant_type": "authorization_code",
            "client_id": "haPvI0_b0I62nZAD5CM5",
            "client_secret": "ZafQcEOUbH",
            #"redirect_uri": "http://localhost:8000/naver-login",
            "code": code,
            "state": state
        }
        
        response = requests.post(token_url, data=data)
        if response.status_code == 200:
            token_info = response.json()
            user_info_url = "https://openapi.naver.com/v1/nid/me"
            headers = {
                "Authorization": token_info["token_type"] + " " + token_info["access_token"]
            }
            user_info_response = requests.get(user_info_url, headers=headers).json()
            user_data = user_info_response["response"]
            if User.objects.filter(username=user_data["id"]).exists():
                user = User.objects.get(username=user_data["id"])
                login(request, user)
                return Response({"detail":"login!"})

            User.objects.create(
                username=user_data["id"],
                nickname=user_data["nickname"],
                name=user_data["name"],
                email=user_data["email"],
                phone=user_data["mobile"],
                login_path=User.LoginPathChoices.NAVER
                )
            return Response(user_data, status=status.HTTP_200_OK)
        else:
            return Response({"error": token_info.error}, status=status.HTTP_400_BAD_REQUEST)