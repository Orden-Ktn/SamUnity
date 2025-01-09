# Generated by Django 4.2.6 on 2025-01-09 14:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0045_classement_veillee_noel'),
    ]

    operations = [
        migrations.CreateModel(
            name='Classement_veillee_nouvel_an',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.CharField(max_length=500)),
                ('veillee_nouvel_an_heure1', models.CharField(max_length=500)),
                ('ap1_veillee_nouvel_an', models.CharField(max_length=700)),
                ('as1_veillee_nouvel_an', models.CharField(max_length=700)),
                ('pc1_veillee_nouvel_an', models.CharField(max_length=700)),
                ('th1_veillee_nouvel_an', models.CharField(max_length=700)),
                ('na1_veillee_nouvel_an', models.CharField(max_length=700)),
                ('veillee_nouvel_an_heure2', models.CharField(max_length=500)),
                ('ap2_veillee_nouvel_an', models.CharField(max_length=700)),
                ('as2_veillee_nouvel_an', models.CharField(max_length=700)),
                ('pc2_veillee_nouvel_an', models.CharField(max_length=700)),
                ('th2_veillee_nouvel_an', models.CharField(max_length=700)),
                ('na2_veillee_nouvel_an', models.CharField(max_length=700)),
                ('annee', models.CharField(max_length=255)),
            ],
        ),
    ]
