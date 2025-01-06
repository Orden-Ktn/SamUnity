# Generated by Django 4.2.6 on 2025-01-04 08:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0027_alter_bilan_activite_activite_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Point_Activite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activite', models.CharField(max_length=700)),
                ('effectif', models.DecimalField(decimal_places=2, max_digits=10)),
                ('montant', models.DecimalField(decimal_places=2, max_digits=10)),
                ('benefice', models.CharField(max_length=5000)),
                ('perte', models.CharField(max_length=5000)),
                ('annee', models.CharField(max_length=255)),
            ],
        ),
    ]
