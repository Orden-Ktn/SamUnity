# Generated by Django 4.2.6 on 2025-01-08 09:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0040_delete_depot_epreuve'),
    ]

    operations = [
        migrations.CreateModel(
            name='Depot_epreuve',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('epreuve', models.FileField(upload_to='epreuves/')),
                ('corrige_type', models.FileField(upload_to='corriges/')),
                ('niveau', models.CharField(max_length=255)),
                ('annee', models.CharField(max_length=255)),
            ],
        ),
    ]
