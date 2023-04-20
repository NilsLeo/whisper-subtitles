from django.shortcuts import render
from django.http import JsonResponse

def getRoutes(request):
  return JsonResponse('our API', safe=False)

# Create your views here.
