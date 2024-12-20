# Generated by Django 3.1.12 on 2024-12-10 02:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Metric',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('primary_coolant_pressure', models.FloatField()),
                ('steam_pressure', models.FloatField()),
                ('primary_coolant_temperature', models.FloatField()),
                ('steam_temperature', models.FloatField()),
                ('feedwater_flow_rate', models.FloatField()),
                ('thermal_efficiency', models.FloatField()),
                ('anomaly', models.BooleanField(default=False)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
