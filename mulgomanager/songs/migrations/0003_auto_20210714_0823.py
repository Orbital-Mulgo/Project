# Generated by Django 3.2.3 on 2021-07-14 08:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('songs', '0002_auto_20210714_0808'),
    ]

    operations = [
        migrations.AddField(
            model_name='song',
            name='audio_file',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='song',
            name='duration',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
