from songs.models import Song
from rest_framework import viewsets, permissions
from .serializers import SongSerializer


# Song Viewset
class SongViewset(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = SongSerializer

    def get_queryset(self):
        return self.request.user.songs.all()

    def perform_create(self, serializer):
        serializer.save(added_by=self.request.user)
