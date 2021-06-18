from django.test import TestCase
from . models import Song


class ModelTesting(TestCase):

    def setUp(self):
        self.songs = Song.objects.create(
            title='testsong', artist='testartist', duration='00:03:25')

    def test_song_model(self):
        s = self.songs
        self.assertTrue(isinstance(s, Song))

    def test_song_title_return(self):
        d = self.songs
        self.assertEqual(str(d), 'testsong')
