from django.urls import path
from .api import (SearchAll, SearchSong)


urlpatterns = [
    path('search/', SearchAll, name="searchall"),
    path('search/song/', SearchSong, name="searchsong"),
]