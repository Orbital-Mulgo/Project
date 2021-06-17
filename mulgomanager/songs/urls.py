from rest_framework import routers
from .api import SongViewset

router = routers.DefaultRouter()
router.register('api/songs', SongViewset, 'songs')

urlpatterns = router.urls
