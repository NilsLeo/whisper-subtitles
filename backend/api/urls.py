from django.urls import path
from . import views


urlpatterns = [
    path('i', views.getRoutes),
    path('videos/', views.getVideos, name='videos'),
    path('videos/<str:pk>/', views.getVideo, name='video')
]
