# from rest_framework import viewsets, permissions
from .serializers import GenreSerializer, ArtistSerializer, SongSerializer
from .models import Genre, Artist, Song
from rest_framework.views import APIView
from rest_framework.response import Response


class GenreView(APIView):
    def get(self, request):
        genres = Genre.objects.all()
        serializer = GenreSerializer(genres, many=True)
        return Response({"genres": serializer.data})

class ArtistView(APIView):
    def get(self, request):
        artists = Artist.objects.all()
        serializer = ArtistSerializer(artists, many=True)
        return Response({"artists": serializer.data})

class SongView(APIView):
    def get(self, request):
        songs = Song.objects.all()
        serializer = ArtistSerializer(songs, many=True)
        return Response({"songs": serializer.data})

# # Genre Viewset
# class GenreViewset(viewsets.ModelViewSet):
#     permission_classes = [
#         permissions.IsAuthenticated
#     ]
    
#     queryset = Genre.objects.all()
#     serializer_class = GenreSerializer

#     def get_queryset(self):
#         return self.request.user.songs.all()

#     def perform_create(self, serializer):
#         serializer.save(owner=self.request.user)

# # Artist Viewset
# class ArtistViewset(viewsets.ModelViewSet):
#     permission_classes = [
#         permissions.IsAuthenticated
#     ]
    
#     queryset = Artist.objects.all()
#     serializer_class = ArtistSerializer

#     def get_queryset(self):
#         return self.request.user.songs.all()

#     def perform_create(self, serializer):
#         serializer.save(owner=self.request.user)

# # Song Viewset
# class SongViewset(viewsets.ModelViewSet):
#     permission_classes = [
#         permissions.IsAuthenticated
#     ]
    
#     queryset = Song.objects.all()
#     serializer_class = SongSerializer

#     def get_queryset(self):
#         return self.request.user.songs.all()

#     def perform_create(self, serializer):
#         serializer.save(owner=self.request.user)
