from rest_framework import serializers
from songs.models import Genre, Artist, Song, SongInfo


# Genre Serializer
class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


# Artist Serializer
class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = '__all__'


# Song Serializer
class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = '__all__'

# SongInfo Serializer
class SongInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SongInfo
        fields = '__all__'
        
