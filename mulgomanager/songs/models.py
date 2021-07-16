from django.db import models
from django_extensions.db.fields import AutoSlugField


def my_slugify_function(content):
    return content.replace('_', '-').lower()


class GenreManager(models.Manager):
    def create_genre(self, name, popularity, duration_ms, acousticness, danceability, energy, instrumentalness,
                     liveness, loudness, speechiness, tempo, valence, key, mode):
        genre = self.create(name=name, popularity=popularity, duration_ms=duration_ms, acousticness=acousticness,
                            danceability=danceability, energy=energy, instrumentalness=instrumentalness,
                            liveness=liveness, loudness=loudness, speechiness=speechiness, tempo=tempo,
                            valence=valence, key=key, mode=mode)
        return genre


class Genre(models.Model):
    name = models.CharField(max_length=200, primary_key=True)
    popularity = models.FloatField()
    duration_ms = models.FloatField()
    acousticness = models.FloatField()
    danceability = models.FloatField()
    energy = models.FloatField()
    instrumentalness = models.FloatField()
    liveness = models.FloatField()
    loudness = models.FloatField()
    speechiness = models.FloatField()
    tempo = models.FloatField()
    valence = models.FloatField()
    key = models.IntegerField()
    mode = models.IntegerField()
    slug = AutoSlugField(populate_from='name', slugify_function=my_slugify_function)

    def __str__(self):
        return self.name


class ArtistManager(models.Manager):
    def create_artist(self, id, name, popularity, followers, genres):
        artist = self.create(id=id, name=name, popularity=popularity, followers=followers)
        return artist


class Artist(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=200)
    popularity = models.IntegerField(null=True)
    followers = models.FloatField(default=0.0, null=True)
    genres = models.ManyToManyField(Genre)
    slug = AutoSlugField(populate_from='name', slugify_function=my_slugify_function)
    objects = ArtistManager()

    def __str__(self):
        return self.name


class SongManager(models.Manager):
    def create_song(self, id, name, popularity, duration_ms, explicit, release_date, acousticness,
                    danceability, energy, instrumentalness, liveness, loudness, speechiness, tempo,
                    valence, key, mode, time_signature):
        song = self.create(id=id, name=name, popularity=popularity, duration_ms=duration_ms, explicit=explicit,
                           release_date=release_date, acousticness=acousticness, danceability=danceability,
                           energy=energy, instrumentalness=instrumentalness, liveness=liveness, loudness=loudness,
                           speechiness=speechiness, tempo=tempo, valence=valence, key=key, mode=mode,
                           time_signature=time_signature)
        return song


class Song(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=200)
    popularity = models.IntegerField()
    duration_ms = models.FloatField()
    explicit = models.BooleanField()
    artists = models.ManyToManyField(Artist, blank=True)
    release_date = models.DateField(blank=True, null=True)
    acousticness = models.FloatField()
    danceability = models.FloatField()
    energy = models.FloatField()
    instrumentalness = models.FloatField()
    liveness = models.FloatField()
    loudness = models.FloatField()
    speechiness = models.FloatField()
    tempo = models.FloatField()
    valence = models.FloatField()
    key = models.IntegerField()
    mode = models.IntegerField()
    time_signature = models.IntegerField()
    slug = AutoSlugField(populate_from='name', slugify_function=my_slugify_function)
    header_image_url = models.URLField(blank=True)
    header_image_thumbnail_url = models.URLField(blank=True)
    song_image_url = models.URLField(blank=True)
    song_image_thumbnail_url = models.URLField(blank=True)
    genius_id = models.CharField(max_length=100, blank=True)
    lyrics = models.TextField(blank=True, default="No lyrics at the moment")
    objects = SongManager()

    def __str__(self):
        return self.name
