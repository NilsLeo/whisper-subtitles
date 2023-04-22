from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import VideoSerializer
from .models import Video
from . import transcript

@api_view(['GET', 'POST'])
def videos_list(request):
    if request.method == 'GET':
        videos = Video.objects.all().order_by('-updated')
        serializer = VideoSerializer(videos, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        transcript.download_video_and_convert_to_mp3(request.data['url'])
        request.data['transcript'] = transcript.create_transcript()
        transcript.delete_mp3()
        request.data['summary'] = transcript.create_summary(request.data['transcript'])
        # request.data['description'] = transcript.get_description(request.data['url'])
        # request.data['title'] = transcript.get_title(request.data['url'])
        serializer = VideoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def video_detail(request, pk):
    try:
        video = Video.objects.get(id=pk)
    except Video.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = VideoSerializer(video, many=False)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = VideoSerializer(video, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        video.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
