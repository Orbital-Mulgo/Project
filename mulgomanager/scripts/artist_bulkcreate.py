from songs.models import Artist, Genre
import pandas as pd
import time
from datetime import datetime, timedelta


def run():
    start_time = time.time()
    print("Stage 1: Artists Dictionary Conversion Starts at %s seconds" % (str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    excel_file_path = "/Users/kian/Documents/GitHub/Project/mulgomanager/scripts/dataset"
    full_artists_list = pd.read_csv(excel_file_path + "/artists.csv", converters={'genres': eval})
    artist_dict = full_artists_list.to_dict('records')
    number_of_artists = len(full_artists_list)
    print("Stage 1: Artists Dictionary Conversion Completed at %s seconds" % (str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    print("Stage 2: Artists Model Creation Starts at %s seconds" % (str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    model_instances = [Artist(
        id=artist['id'], 
        name=artist['name'], 
        popularity=artist['popularity'], 
        followers=artist['followers'],
    ) for artist in artist_dict]
    
    Artist.objects.bulk_create(model_instances, ignore_conflicts=True)
    print("Stage 2: Artists Model Creation Completed at %s seconds" % (str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    
    genre_counter = 0
    artist_counter = 0
    artist_with_genre = 0
    print("Stage 3: Genres Addition Starts at %s seconds" % (str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    for artist in artist_dict:
        artist_counter += 1
        if len(artist['genres']) > 0:
            current_artist = Artist.objects.filter(pk=artist['id']).get()
            artist_with_genre += 1
            for genre in artist['genres']:
                try:
                    current_genre = Genre.objects.filter(pk=genre).get()
                    current_artist.genres.add(current_genre)
                    genre_counter += 1
                except Genre.DoesNotExist:
                    continue
        if artist_counter % 10000 == 0:
            print("--- %d artists have been processed, %d more to go ---" % (artist_counter, number_of_artists - artist_counter))
    print("Stage 3: Genres Addition Completed at %s seconds" % (str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    print("--- Database created %d artists and updated %d genres for %d artists in %s seconds ---" % (number_of_artists, genre_counter, artist_with_genre, str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    