# Generated by Django 4.2.6 on 2025-01-06 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0037_delete_point_activite'),
    ]

    operations = [
        migrations.CreateModel(
            name='Point_Activite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activite', models.CharField(max_length=700)),
                ('effectif', models.CharField(max_length=500)),
                ('montantrecolte', models.CharField(max_length=500)),
                ('montantdepense', models.CharField(max_length=500)),
                ('benefice', models.CharField(max_length=500)),
                ('perte', models.CharField(max_length=500)),
                ('annee', models.CharField(max_length=255)),
            ],
        ),
    ]
