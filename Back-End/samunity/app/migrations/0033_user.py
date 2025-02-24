# Generated by Django 4.2.6 on 2025-01-05 14:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0032_delete_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('poste', models.CharField(max_length=50)),
                ('mandature', models.CharField(max_length=50)),
                ('password', models.CharField(max_length=255)),
            ],
        ),
    ]
