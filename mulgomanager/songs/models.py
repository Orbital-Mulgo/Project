from django.db import models
from django.contrib.auth.models import User


class Song(models.Model):
    title = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)
    image = models.CharField(max_length=100, blank=True, null=True)
    duration = models.CharField(max_length=20, null=True)
    audio_file = models.FileField(blank=True, null=True)
    audio_link = models.CharField(max_length=200, blank=True, null=True)
    added_by = models.ForeignKey(
        User, related_name="songs", on_delete=models.CASCADE, null=True)
    added_on = models.DateTimeField(auto_now_add=True)
    paginate_by = 2

    def __str__(self):
        return self.title