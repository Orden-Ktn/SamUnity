# Generated by Django 4.2.6 on 2025-01-03 13:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0013_responsable'),
    ]

    operations = [
        migrations.CreateModel(
            name='Depense',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('annee', models.CharField(max_length=255)),
                ('montant', models.DecimalField(decimal_places=2, max_digits=10)),
                ('motif', models.DecimalField(decimal_places=2, max_digits=10)),
                ('caisse', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
    ]
