# Generated by Django 3.2.3 on 2021-07-26 06:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('songs', '0002_songinfo'),
    ]

    operations = [
        migrations.AddField(
            model_name='songinfo',
            name='added_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='songinfos', to=settings.AUTH_USER_MODEL),
        ),
    ]
