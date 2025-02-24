# Generated by Django 4.2.6 on 2025-01-07 09:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0038_point_activite'),
    ]

    operations = [
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('option', models.CharField(max_length=100)),
                ('note', models.FloatField()),
                ('date_ajout', models.DateTimeField(auto_now_add=True)),
                ('enfant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.enfant')),
            ],
        ),
    ]
