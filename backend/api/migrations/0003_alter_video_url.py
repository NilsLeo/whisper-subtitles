# Generated by Django 4.2 on 2023-04-20 20:49

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0002_alter_video_title_alter_video_transcript"),
    ]

    operations = [
        migrations.AlterField(
            model_name="video",
            name="url",
            field=models.TextField(blank=True, null=True),
        ),
    ]
