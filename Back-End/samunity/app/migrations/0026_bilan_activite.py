# Generated by Django 4.2.6 on 2025-01-04 06:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0025_activite'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bilan_Activite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activite', models.CharField(max_length=5000)),
                ('effectif', models.CharField(max_length=5000)),
                ('montant', models.CharField(max_length=5000)),
                ('ressource', models.CharField(max_length=5000)),
                ('difficulte', models.CharField(max_length=5000)),
                ('annee', models.CharField(max_length=255)),
            ],
        ),
    ]
