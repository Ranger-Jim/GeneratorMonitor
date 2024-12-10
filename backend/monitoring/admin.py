from django.contrib import admin
from .models import Metric

#View metrics from Django admin page
@admin.register(Metric)
class MetricAdmin(admin.ModelAdmin):
  list_display = (
    'primary_coolant_pressure',
    'steam_pressure',
    'primary_coolant_temperature',
    'steam_temperature',
    'feedwater_flow_rate',
    'thermal_efficiency',
    'anomaly',
    'timestamp',
  )