from django.urls import path
from .api import (
    SearchAll, 
    SearchSong, 
    SearchArtist, 
    SearchAlbum)


urlpatterns = [
    path('search/', SearchAll, name="searchall"),
    path('search/song/', SearchSong, name="searchsong"),
    path('search/artist/', SearchArtist, name="searchartist"),
    path('search/album/', SearchAlbum, name="searchalbum"),
]
