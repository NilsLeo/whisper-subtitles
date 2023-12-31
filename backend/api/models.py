from django.db import models

class Video(models.Model):
    title = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    url = models.CharField(max_length=200, default='https://www.youtube.com/watch?v=9bZkp7q19f0')
    type = models.TextField(null=True, blank=True)
    transcript = models.TextField(null=True, blank=True)
    summary = models.TextField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.url
