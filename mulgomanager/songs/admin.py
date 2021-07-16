from django.contrib import admin
from .models import Genre, Artist, Song
import string


class AlphabetFilter(admin.SimpleListFilter):
    title = 'alphabet'
    parameter_name = 'alphabet'

    def lookups(self, request, model_admin):
        abc = list(string.ascii_lowercase)
        return ((c.upper(), c.upper()) for c in abc)

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(name__startswith=self.value())


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ("name",)
    list_filter = (AlphabetFilter,)
    search_fields = ['name', ]


@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ("id", "name", 'full_genres')
    list_filter = (AlphabetFilter,)
    search_fields = ['id', 'name', ]

    def full_genres(self, obj):
        return "\n".join([genre.name for genre in obj.genres.all()])


@admin.register(Song)
class SongAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "popularity", 'full_artists')
    list_filter = (AlphabetFilter,)
    search_fields = ['id', 'name', ]

    def full_artists(self, obj):
        return "\n".join([artist.name for artist in obj.artists.all()])
