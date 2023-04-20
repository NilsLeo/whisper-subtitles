from django.db import models

class Video(models.Model):
    title = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    url = models.TextField()
    genre = models.TextField(null=True, blank=True)
    noOfRequestedWords = models.IntegerField(null=True, blank=True)
    transcript = models.TextField(null=True, blank=True)
    summary = models.TextField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
