from songs.models import Genre
import pandas as pd
import time
from datetime import datetime, timedelta


def run():
    start_time = time.time()
    print("Stage 1: Genres Dictionary Conversion Starts at %s seconds" % (str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    excel_file_path = "/Users/kian/Documents/GitHub/Project/mulgomanager/scripts/dataset"
    full_genres_list = pd.read_csv(excel_file_path + "/data_by_genres_o.csv")
    genre_dict = full_genres_list.to_dict('records')
    number_of_genres = len(full_genres_list)
    print("Stage 1: Genres Dictionary Conversion Completed at %s seconds" % (str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    print("Stage 2: Genres Model Creation Starts at %s seconds" % (str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    model_instances = [Genre(
        name=genre['genres'], 
        popularity=genre['popularity'], 
        duration_ms=genre['duration_ms'], 
        acousticness=genre['acousticness'], 
        danceability=genre['danceability'], 
        energy=genre['energy'], 
        instrumentalness=genre['instrumentalness'], 
        liveness=genre['liveness'], 
        loudness=genre['loudness'], 
        speechiness=genre['speechiness'], 
        tempo=genre['tempo'], 
        valence=genre['valence'], 
        key=genre['key'], 
        mode=genre['mode'],
    ) for genre in genre_dict]
    
    Genre.objects.bulk_create(model_instances, ignore_conflicts=True)
    print("Stage 2: Genres Model Creation Completed at %s seconds" % (str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    print("--- Database updated with %d genres in %s seconds ---" % (number_of_genres, str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    