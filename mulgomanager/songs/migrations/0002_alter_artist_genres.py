# Generated by Django 3.2.3 on 2021-07-08 17:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('songs', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='artist',
            name='genres',
            field=models.ManyToManyField(to='songs.Genre'),
        ),
    ]
