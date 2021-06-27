import os
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
import lyricsgenius
# import requests


headers = {
    'Authorization': f"Bearer {os.environ['GENIUS_ACCESS_TOKEN']}"
}

genius = lyricsgenius.Genius()


@api_view(('GET','POST'))
@renderer_classes((JSONRenderer, BrowsableAPIRenderer))
def SearchAll(request):
    payload = request.data
    # url = "https://api.genius.com/search"
    # response = requests.request("GET", url, headers=headers, params=payload)
    # result = response.json()
    # title = request.data['field']
    # Using lyricsgenius to retrieve scrapped lyrics
    song = genius.search_songs(payload["search_term"])
    # values = song.to_dict()
    # Convert each line to a list element
    # lyrics = song.to_text().splitlines()
    return Response(song)

# Search for specific songs
@api_view(('GET', 'POST'))
@renderer_classes((JSONRenderer, BrowsableAPIRenderer))
def SearchSong(request):
    payload=request.data
    song = genius.search_song(payload["search_term"])
    values = song.to_json()
    return Response(values)


# REFERENCES
"""
Codes below are for reference
For subsequent functionality implementation
"""

# Search for songs based on keywords
# @api_view(('GET', ))
# @renderer_classes((JSONRenderer, BrowsableAPIRenderer))
# def SearchAll(request):
#     url = "https://api.genius.com/search"
#     payload=request.data
#     response = requests.request("GET", url, headers=headers, params=payload)
#     result = response.json()
#     # Test whether can access the attributes of the response object
#     title = []
#     for song in result['response']['hits']:
#         title.append(song['result']['title'])
#     song = genius.search_song(title[0])
#     lyrics = song.to_text().splitlines() # Convert each line to a list element
#     # print(response.text)
#     return Response(lyrics, status=response.status_code)

# # Search for songs based on id
# @api_view(('GET','POST' ))
# @renderer_classes((JSONRenderer, BrowsableAPIRenderer))
# def SearchWithSongID(request):
#     url = "https://api.genius.com/songs/378195"
#     payload=request.data
#     response = request.request("GET", url, headers=headers, params=payload)
#     result = response.json()
#     # # Test whether can access the attributes of the response object
#     # title = []
#     # for song in result['response']['hits']:
#     #     title.append(song['result']['title'])
#     # print(response.text)
#     return Response(result, status=response.status_code)
