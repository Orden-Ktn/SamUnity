# Generated by Django 4.2.6 on 2025-01-09 16:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0047_classement_semaine_classement_triduum_pascal'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Classement_semaine',
        ),
        migrations.DeleteModel(
            name='Classement_triduum_pascal',
        ),
        migrations.DeleteModel(
            name='Classement_veillee_noel',
        ),
        migrations.DeleteModel(
            name='Classement_veillee_nouvel_an',
        ),
    ]
