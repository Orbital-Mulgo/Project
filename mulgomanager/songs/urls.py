from rest_framework import routers
# from .api import GenreViewset, ArtistViewset, SongViewset

# router = routers.DefaultRouter()
# router.register('api/genres', GenreViewset, 'genres')
# router.register('api/artists', ArtistViewset, 'artists')
# router.register('api/songs', SongViewset, 'songs')

# urlpatterns = router.urls


from django.urls import path
from .api import GenreView, ArtistView, SongView, SongInfoViewset

app_name = "songs"

router = routers.DefaultRouter()
router.register('api/songs', SongInfoViewset, 'songinfos')

urlpatterns = router.urls + [
    path('genres/', GenreView.as_view()),
    path('artists/', ArtistView.as_view()),
    path('songs/', SongView.as_view()),
]