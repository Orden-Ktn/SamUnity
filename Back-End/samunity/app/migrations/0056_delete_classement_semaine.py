# Generated by Django 4.2.6 on 2025-01-11 09:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0055_rename_ce1_fete_classement_fete_heure_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Classement_semaine',
        ),
    ]
