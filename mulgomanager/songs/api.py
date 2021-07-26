from rest_framework import viewsets, permissions, status, generics, filters
from inspect import GEN_CLOSED
from .serializers import GenreSerializer, ArtistSerializer, SongSerializer, SongInfoSerializer
from .models import Genre, Artist, Song, SongInfo
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view


class GenreView(generics.ListCreateAPIView):
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


class ArtistView(generics.ListCreateAPIView):
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer


class SongView(generics.ListCreateAPIView):
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)
    queryset = Song.objects.all()
    serializer_class = SongSerializer



# class SongView(APIView):
#     def get(self, request, *args, **kwargs):
#         try:
#             name = request.query_params["name"]
#             if name != None:
#                 song = Song.objects.get(name__contains=name)
#                 serializer = SongSerializer(song)
#         except:
#             songs = Song.objects.all()
#             serializer = SongSerializer(songs, many=True)

#         return Response(serializer.data)
#     # def get(self, request):
#     #     songs = Song.objects.all()
#     #     serializer = SongSerializer(songs, many=True)
#     #     return Response({"songs": serializer.data})


def feature_range(metrics_type, deviation):
    metrics = float(metrics_type)
    deviation = float(deviation)
    range_difference = metrics * (deviation / 100)
    if metrics < 0:
        # print((metrics + range_difference, metrics - range_difference))
        return (metrics + range_difference, metrics - range_difference)
    # print((metrics - range_difference, metrics + range_difference))
    return (metrics - range_difference, metrics + range_difference)


class DiscoverView(APIView):
    def get(self, request, *args, **kwargs):
        # try:
        acousticness = request.query_params["acousticness"] # 0 to 1
        danceability = request.query_params["danceability"] # 0 to 1
        energy = request.query_params["energy"] # 0 to 1
        instrumentalness = request.query_params["instrumentalness"] # 0 to 1
        liveness = request.query_params["liveness"] # 0 to 1
        speechiness = request.query_params["speechiness"] # 0 to 1
        valence = request.query_params["valence"] # 0 to 1
        loudness = request.query_params["loudness"] # -60 to 0
        tempo = request.query_params["tempo"] # 50 to 150
        deviation = request.query_params["deviation"] # 0 to 100
        discovered_songs = Song.objects.filter(acousticness__range=feature_range(acousticness, deviation),
                                    danceability__range=feature_range(danceability, deviation),
                                    energy__range=feature_range(energy, deviation),
                                    instrumentalness__range=feature_range(instrumentalness, deviation),
                                    liveness__range=feature_range(liveness, deviation),
                                    speechiness__range=feature_range(speechiness, deviation),
                                    valence__range=feature_range(valence, deviation),
                                    loudness__range=feature_range(loudness, deviation),
                                    tempo__range=feature_range(tempo, deviation)).all()
        discovered_songs_count = discovered_songs.count()
        serializer = SongSerializer(discovered_songs, many=True)
        print(discovered_songs_count)
        return Response(serializer.data)


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
