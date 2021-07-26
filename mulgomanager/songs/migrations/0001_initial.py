# Generated by Django 3.2.3 on 2021-07-25 17:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_extensions.db.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Artist',
            fields=[
                ('id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('popularity', models.IntegerField(null=True)),
                ('followers', models.FloatField(default=0.0, null=True)),
                ('slug', django_extensions.db.fields.AutoSlugField(blank=True, editable=False, null=True, populate_from='name')),
            ],
        ),
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('name', models.CharField(max_length=200, primary_key=True, serialize=False)),
                ('popularity', models.FloatField()),
                ('duration_ms', models.FloatField()),
                ('acousticness', models.FloatField()),
                ('danceability', models.FloatField()),
                ('energy', models.FloatField()),
                ('instrumentalness', models.FloatField()),
                ('liveness', models.FloatField()),
                ('loudness', models.FloatField()),
                ('speechiness', models.FloatField()),
                ('tempo', models.FloatField()),
                ('valence', models.FloatField()),
                ('key', models.IntegerField()),
                ('mode', models.IntegerField()),
                ('slug', django_extensions.db.fields.AutoSlugField(blank=True, editable=False, null=True, populate_from='name')),
            ],
        ),
        migrations.CreateModel(
            name='SongInfo',
            fields=[
                ('id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200, null=True)),
                ('popularity', models.IntegerField()),
                ('duration_ms', models.FloatField(null=True)),
                ('explicit', models.BooleanField(null=True)),
                ('release_date', models.DateField(blank=True, null=True)),
                ('acousticness', models.FloatField(null=True)),
                ('danceability', models.FloatField(null=True)),
                ('energy', models.FloatField(null=True)),
                ('instrumentalness', models.FloatField(null=True)),
                ('liveness', models.FloatField(null=True)),
                ('loudness', models.FloatField(null=True)),
                ('speechiness', models.FloatField(null=True)),
                ('tempo', models.FloatField(null=True)),
                ('valence', models.FloatField(null=True)),
                ('key', models.IntegerField(null=True)),
                ('mode', models.IntegerField(null=True)),
                ('time_signature', models.IntegerField(null=True)),
                ('slug', django_extensions.db.fields.AutoSlugField(blank=True, editable=False, null=True, populate_from='name')),
                ('header_image_url', models.CharField(blank=True, max_length=100, null=True)),
                ('header_image_thumbnail_url', models.CharField(blank=True, max_length=100, null=True)),
                ('song_image_url', models.CharField(blank=True, max_length=100, null=True)),
                ('song_image_thumbnail_url', models.CharField(blank=True, max_length=100, null=True)),
                ('genius_id', models.CharField(blank=True, max_length=100, null=True)),
                ('lyrics', models.TextField(blank=True, default='No lyrics at the moment', null=True)),
                ('added_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='songinfos', to=settings.AUTH_USER_MODEL)),
                ('artists', models.ManyToManyField(blank=True, to='songs.Artist')),
            ],
        ),
        migrations.CreateModel(
            name='Song',
            fields=[
                ('id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200, null=True)),
                ('popularity', models.IntegerField()),
                ('duration_ms', models.FloatField(null=True)),
                ('explicit', models.BooleanField(null=True)),
                ('release_date', models.DateField(blank=True, null=True)),
                ('acousticness', models.FloatField(null=True)),
                ('danceability', models.FloatField(null=True)),
                ('energy', models.FloatField(null=True)),
                ('instrumentalness', models.FloatField(null=True)),
                ('liveness', models.FloatField(null=True)),
                ('loudness', models.FloatField(null=True)),
                ('speechiness', models.FloatField(null=True)),
                ('tempo', models.FloatField(null=True)),
                ('valence', models.FloatField(null=True)),
                ('key', models.IntegerField(null=True)),
                ('mode', models.IntegerField(null=True)),
                ('time_signature', models.IntegerField(null=True)),
                ('slug', django_extensions.db.fields.AutoSlugField(blank=True, editable=False, null=True, populate_from='name')),
                ('header_image_url', models.CharField(blank=True, max_length=100, null=True)),
                ('header_image_thumbnail_url', models.CharField(blank=True, max_length=100, null=True)),
                ('song_image_url', models.CharField(blank=True, max_length=100, null=True)),
                ('song_image_thumbnail_url', models.CharField(blank=True, max_length=100, null=True)),
                ('genius_id', models.CharField(blank=True, max_length=100, null=True)),
                ('lyrics', models.TextField(blank=True, default='No lyrics at the moment', null=True)),
                ('artists', models.ManyToManyField(blank=True, to='songs.Artist')),
            ],
        ),
        migrations.AddField(
            model_name='artist',
            name='genres',
            field=models.ManyToManyField(to='songs.Genre'),
        ),
    ]
