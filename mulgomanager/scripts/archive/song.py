import os
from dotenv import load_dotenv
import lyricsgenius as lg
from songs.models import Artist, Song
from requests.exceptions import HTTPError, Timeout
import pandas as pd
import time
from datetime import timedelta


def run():
    start_time = time.time()
    excel_file_path = "/Users/kian/Documents/GitHub/Project/mulgomanager/AllArtist.xlsx"
    df = pd.read_excel(excel_file_path, header=None)
    full_artist_names = df[0]
    first_100 = full_artist_names[1:10]

    load_dotenv()

    token = os.getenv('GENIUS_CLIENT_ID')
    # genius = lg.Genius(token, timeout=10, skip_non_songs=True, excluded_terms=["(Remix)", "(Live)"])
    genius = lg.Genius(token, timeout=10, skip_non_songs=True)

    number_of_artists = 0
    number_of_songs = 0
    for name in first_100:
        try:
            artist = genius.search_artist(name, max_songs=5, sort='popularity', get_full_info=False)
            artist_dict = artist.to_dict()
            # album = genius.artist_albums(artist.id)
            # tracks = genius.album_tracks(album['albums'][0]['id'])
            # print(album['albums'][0]['id'])
            # print(artist.songs[:1])
            # print(tracks)

            if not Artist.objects.filter(pk=artist.id).exists():
                artist_instance = Artist.objects.create_artist(artist.id, artist.name,
                                                               artist_dict['description']['plain'],
                                                               artist.header_image_url, artist.image_url,
                                                               artist.url)
                artist_instance.save()
                number_of_artists += 1
            else:
                artist_instance = Artist.objects.filter(pk=artist.id).get()

            for song in artist.songs:
                if not Song.objects.filter(pk=song.id).exists():
                    annotations = genius.song_annotations(song.id)
                    song_instance = Song.objects.create_song(song.id, song.title, artist_instance,
                                                             song.header_image_url, song.song_art_image_url,
                                                             song.lyrics, annotations)
                    song_instance.save()
                    number_of_songs += 1
        except HTTPError as e:
            print(e.errno)    # status code
            print(e.args[0])  # status code
            print(e.args[1])  # error message
        except Timeout:
            print(f"Timeout occurred while searching for ${name}")
            continue
        except AttributeError as e:
            print(e)
            print(f"${name} not found.")
            continue
    print("--- Database updated with %d artists and %d songs in %s seconds ---" %
          (number_of_artists, number_of_songs, str(timedelta(seconds=time.time() - start_time)).split(".")[0]))
