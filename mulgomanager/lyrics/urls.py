from django.urls import path
from .api import (SearchAll)


urlpatterns = [
    path('search/', SearchAll, name="search"),
]