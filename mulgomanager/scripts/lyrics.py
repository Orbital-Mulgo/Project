# Add song lyrics for songs with popularity rating 80 or above.

import os
from dotenv import load_dotenv
import lyricsgenius as lg
from songs.models import Song
import time
from datetime import datetime, timedelta
from tqdm import tqdm


def run():
    start_time = time.time()
    print("Stage 1: Lyrics Update Starts at %s seconds" % (str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    load_dotenv()
    token = os.getenv('GENIUS_CLIENT_ID')
    genius = lg.Genius(token, timeout=60, skip_non_songs=True)
    
    songs = Song.objects.all()
    
    total = len(songs)
    processed, updated, missing = 0, 0, 0
    # Search the song by song name in Genius, and add the lyrics into the database
    with tqdm(total=total) as pbar:
        for song in songs:
            if song.popularity >= 80:
                if song.lyrics == "No lyrics at the moment":
                    track = genius.search_song(song.name)
                    if track:
                        try:
                            track_dict = track.to_dict()
                            song.genius_id = track_dict['id']
                            song.lyrics = track_dict['lyrics']
                            song.header_image_url = track_dict['header_image_url']
                            song.header_image_thumbnail_url = track_dict['header_image_thumbnail_url']
                            song.song_image_url = track_dict['song_art_image_url']
                            song.song_image_thumbnail_url = track_dict['song_art_image_thumbnail_url']
                            song.save()
                            updated += 1
                        except:
                            pass
                    else:
                        missing += 1
            
            pbar.update(1)
            processed += 1
            if processed % 50000 == 0:
                print("%.2f%% of the songs has been processed, %d songs more to go" % ((processed/total)*100, total - processed))
            
    print("Stage 1: Lyrics Update Completed at %s seconds" % (str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    print("--- %.2f%% (%d) of the songs lyrics cannot be found ---" % ((missing/total)*100, missing))
    print("--- Database updated with %d songs in %s seconds ---" % (updated, str(timedelta(seconds = time.time() - start_time)).split(".")[0]))
    