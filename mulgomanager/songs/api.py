from rest_framework import viewsets, permissions
from inspect import GEN_CLOSED
from .serializers import GenreSerializer, ArtistSerializer, SongSerializer, SongInfoSerializer
from .models import Genre, Artist, Song, SongInfo
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


class GenreView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            name = request.query_params["name"]
            if name != None:
                genre = Genre.objects.get(name__contains=name)
                serializer = GenreSerializer(genre)
        except:
            genres = Genre.objects.all()
            serializer = GenreSerializer(genres, many=True)

        return Response(serializer.data)


class ArtistView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            id = request.query_params["id"]
            if id != None:
                artist = Artist.objects.get(id=id)
                serializer = ArtistSerializer(artist)
        except:
            artists = Artist.objects.all()
            serializer = ArtistSerializer(artists, many=True)

        return Response(serializer.data)

    # def get(self, request):
    #     artists = Artist.objects.all()
    #     serializer = ArtistSerializer(artists, many=True)
    #     return Response({"artists": serializer.data})


class SongView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            name = request.query_params["name"]
            if name != None:
                song = Song.objects.get(name__contains=name)
                serializer = SongSerializer(song)
        except:
            songs = Song.objects.all()
            serializer = SongSerializer(songs, many=True)

        return Response(serializer.data)
    # def get(self, request):
    #     songs = Song.objects.all()
    #     serializer = SongSerializer(songs, many=True)
    #     return Response({"songs": serializer.data})


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

# Song Viewset
class SongInfoViewset(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    queryset = SongInfo.objects.all()
    serializer_class = SongInfoSerializer

    def get_queryset(self):
        return self.request.user.songinfos.all()

    def perform_create(self, serializer):
        serializer.save(added_by=self.request.user)
