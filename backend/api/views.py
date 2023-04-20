from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import VideoSerializer
from .models import Video

@api_view(['GET'])
def getVideos(request):
  videos = Video.objects.all()
  serializer = VideoSerializer(videos, many=True)
  return Response(serializer.data)


def getVideo(request, pk):
  videos = Video.objects.get(id=pk)
  serializer = VideoSerializer(videos, many=False)
  return Response(serializer.data)


def getRoutes(request):
  return JsonResponse('Hello', safe=False)
