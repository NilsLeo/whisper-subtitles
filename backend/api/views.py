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

@api_view(['POST'])
def createVideo(request):
  serializer = VideoSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
  return Response(serializer.data)

@api_view(['PUT'])
def updateVideo(request, pk):
  video = Video.objects.get(id=pk)
  serializer = VideoSerializer(instance=video, data=request.data)
  if serializer.is_valid():
    serializer.save()
  return Response(serializer.data)

@api_view(['DELETE'])
def deleteVideo(request, pk):
  video = Video.objects.get(id=pk)
  video.delete()
  return Response('Video Deleted')
