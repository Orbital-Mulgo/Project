from songs.models import Song, Artist
import pandas as pd
import numpy as np
import time
from datetime import datetime, timedelta
from tqdm import tqdm
from django.db import connection, connections


# Check and returns the index of the rows who consist of artists loaded in the database
def consist_artist(df, criteria_list):
    new_df = df.iloc[:,6:7]
    result = []
    with tqdm(total=len(new_df)) as pbar:
        for i in range(len(new_df)):
            if len(new_df['id_artists'][i]) > 0:
                for e in new_df['id_artists'][i]:
                    if e in criteria_list:
                        result.append(i)
                        break
            pbar.update(1)
    return result


# Check if mysql connection still working, if not, then delete the old connection
def make_sure_mysql_usable():
    if connection.connection and not connection.is_usable():
        del connections._connections.default


def run():
    start_time = time.time()
    print("Stage 1: Songs Dictionary Conversion Starts at %s seconds" % (str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    excel_file_path = "/Users/kian/Documents/GitHub/Project/mulgomanager/scripts/dataset"
    full_songs_list = pd.read_csv(excel_file_path + "/tracks.csv", converters={'artists': eval, 'id_artists': eval})
    full_songs_list['release_date'] = pd.to_datetime(full_songs_list['release_date'])
    full_songs_list['release_date'] = full_songs_list['release_date'].astype(object).where(full_songs_list['release_date'].notnull(), None)
    
    df = pd.DataFrame.from_records(Artist.objects.all().values())
    artist_name_list = df['id'].tolist()    
    filtered_df = full_songs_list.loc[consist_artist(full_songs_list, artist_name_list), :]
    song_dict = filtered_df.to_dict('records')
    number_of_songs = len(filtered_df)
    print("Stage 1: Songs Dictionary Conversion Completed at %s seconds" % (str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    print("Stage 2: Songs Model Creation Starts at %s seconds" % (str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    make_sure_mysql_usable()
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
    
    artist_counter, song_counter, song_with_artist = 0, 0, 0
    missing_song, missing_artist = [], []
    print("Stage 3: Artists Addition Starts at %s seconds" % (str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    with tqdm(total=number_of_songs) as pbar:
        for song in song_dict:
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
                    pass
            pbar.update(1)
            # song_counter += 1
            # if song_counter % 10000 == 0:
            #     print("--- %d songs have been processed ---" % (song_counter))
    print("Stage 3: Artists Addition Completed at %s seconds" % (str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    
    if len(missing_artist) > 0:
        print(missing_artist)
    if len(missing_song) > 0:
        print(missing_song)
    
    print("%d Missing Artist" % (len(missing_artist)))
    print("%d Missing Song" % (len(missing_song)))
    print("--- Database updated with %d songs in %s seconds ---" % (number_of_songs, str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    