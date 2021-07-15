from songs.models import Song, Artist
import pandas as pd
import time
from datetime import datetime, timedelta


def run():
    start_time = time.time()
    print("Stage 1: Songs Dictionary Conversion Starts at %s seconds" % (str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    excel_file_path = "/Users/kian/Documents/GitHub/Project/mulgomanager/scripts/dataset"
    full_songs_list = pd.read_csv(excel_file_path + "/tracks.csv", converters={'artists': eval, 'id_artists': eval})
    full_songs_list['release_date'] = pd.to_datetime(full_songs_list['release_date'])
    full_songs_list['release_date'] = full_songs_list['release_date'].astype(object).where(full_songs_list['release_date'].notnull(), None)
    
    song_dict = full_songs_list.to_dict('records')
    
    number_of_songs = len(full_songs_list)
    print("Stage 1: Songs Dictionary Conversion Completed at %s seconds" % (str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    print("Stage 2: Songs Model Creation Starts at %s seconds" % (str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    model_instances = [Song(
        id=song['id'], 
        name=song['name'], 
        popularity=song['popularity'], 
        duration_ms=song['duration_ms'], 
        explicit=song['explicit'],
        release_date=song['release_date'], 
        acousticness=song['acousticness'], 
        danceability=song['danceability'], 
        energy=song['energy'], 
        instrumentalness=song['instrumentalness'], 
        liveness=song['liveness'], 
        loudness=song['loudness'], 
        speechiness=song['speechiness'], 
        tempo=song['tempo'], 
        valence=song['valence'], 
        key=song['key'], 
        mode=song['mode'],
        time_signature=song['time_signature'],
    ) for song in song_dict]
    
    Song.objects.bulk_create(model_instances, ignore_conflicts=True)
    print("Stage 2: Songs Model Creation Completed at %s seconds" % (str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    
    artist_counter = 0
    song_counter = 0
    song_with_artist = 0
    missing_song = []
    missing_artist = []
    print("Stage 3: Artists Addition Starts at %s seconds" % (str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    for song in song_dict:
        song_counter += 1
        if len(song['id_artists']) > 0:
            try:
                current_song = Song.objects.filter(pk=song['id']).get()
                song_with_artist += 1
                for artist in song['id_artists']:
                    try:
                        current_artist = Artist.objects.filter(pk=artist).get()
                        current_song.artists.add(current_artist)
                        artist_counter += 1
                    except Artist.DoesNotExist:
                        missing_artist.append([song['artists'], artist])
                        continue
            except Song.DoesNotExist:
                missing_song.append([song['id'], song['name']])
                continue
        if song_counter % 10000 == 0:
            print("--- %d songs have been processed ---" % (song_counter))
    print("Stage 3: Artists Addition Completed at %s seconds" % (str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    print("--- Database updated with %d songs in %s seconds ---" % (number_of_songs, str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    
    if len(missing_artist) > 0:
        print(missing_artist)
    
    if len(missing_song) > 0:
        print(missing_song)
    
    print("%d Missing Artist" % (len(missing_artist)))
    print("%d Missing Song" % (len(missing_song)))
    