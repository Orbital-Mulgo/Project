import os
from dotenv import load_dotenv
import lyricsgenius as lg
from songs.models import Artist, Song
from requests.exceptions import HTTPError, Timeout
import pandas as pd
import time
from datetime import datetime, timedelta

def run():
    start_time = time.time()
    excel_file_path = "/Users/kian/Documents/GitHub/Project/mulgomanager/scripts/dataset"
    full_artists_list = pd.read_csv(excel_file_path + "/artists.csv")
    full_tracks_list = pd.read_csv(excel_file_path + "/tracks.csv")
    full_genres_list = pd.read_csv(excel_file_path + "/data_by_genres_o.csv")
    # df_dict = full_artists_list.to_dict('records')
    # full_artist_names = full_artists_list[0]
    # first_100 = full_artist_names[0:10]
    # print(df_dict[0])
    print(full_tracks_list.dtypes)
    
#     model_instances = [Artist(
#     field_1=record['field_1'],
#     field_2=record['field_2'],
#     ) for record in df_records]

# MyModel.objects.bulk_create(model_instances)
    
    # load_dotenv()

    # token = os.getenv('GENIUS_CLIENT_ID')
    # # genius = lg.Genius(token, timeout=10, skip_non_songs=True, excluded_terms=["(Remix)", "(Live)"])
    # genius = lg.Genius(token, timeout=10, skip_non_songs=True)
    
    # number_of_artists = 0
    # number_of_songs = 0
    # for name in first_100:
    #     try:
    #         artist = genius.search_artist(name, max_songs=5, sort='popularity', get_full_info=False)
    #         artist_dict = artist.to_dict()
    #         # album = genius.artist_albums(artist.id)
    #         # tracks = genius.album_tracks(album['albums'][0]['id'])
    #         # print(album['albums'][0]['id'])
    #         # print(artist.songs[:1])
    #         # print(tracks)
            
    #         if not Artist.objects.filter(pk=artist.id).exists():
    #             artist_instance = Artist.objects.create_artist(artist.id, artist.name, artist_dict['description']['plain'], 
    #                                                             artist.header_image_url, artist.image_url, artist.url)
    #             artist_instance.save()
    #             number_of_artists += 1
    #         else:
    #             artist_instance = Artist.objects.filter(pk=artist.id).get()
                
    #         for song in artist.songs:
    #             if not Song.objects.filter(pk=song.id).exists():
    #                 annotations = genius.song_annotations(song.id)
    #                 song_instance = Song.objects.create_song(song.id, song.title, artist_instance, song.header_image_url, song.song_art_image_url, song.lyrics, annotations)
    #                 song_instance.save()
    #                 number_of_songs += 1
    #     except HTTPError as e:
    #         print(e.errno)    # status code
    #         print(e.args[0])  # status code
    #         print(e.args[1])  # error message
    #     except Timeout:
    #         print(f"Timeout occurred while searching for ${name}")
    #         continue
    #     except AttributeError as e:
    #         print(e)
    #         print(f"${name} not found.")
    #         continue
    # print("--- Database updated with %d artists and %d songs in %s seconds ---" % (number_of_artists, number_of_songs, str(timedelta(seconds = time.time() - start_time)).split(".")[0]))