# Generated by Django 4.2.6 on 2025-01-03 21:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0019_montantcalcule'),
    ]

    operations = [
        migrations.CreateModel(
            name='Objectif_TG',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('objectif', models.CharField(max_length=255)),
                ('annee', models.CharField(max_length=255)),
            ],
        ),
    ]
