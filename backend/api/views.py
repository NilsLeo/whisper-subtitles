from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def getVideos(request):
  return JsonResponse('Videos')

def getRoutes(request):
  return JsonResponse('Hello', safe=False)
