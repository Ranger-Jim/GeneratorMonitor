import os
import sys
import django
from datetime import datetime
import random
import time

# Add the backend folder to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

# Set the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nuclear_monitoring.settings')

# Initialize Django
django.setup()

from monitoring.models import Metric


def generate_metrics():
    metric = Metric(
        primary_coolant_pressure=random.uniform(2000, 2500),
        steam_pressure=random.uniform(1000, 1200),
        primary_coolant_temperature=random.uniform(500, 600),
        steam_temperature=random.uniform(500, 550),
        feedwater_flow_rate=random.uniform(1100, 1200),
        thermal_efficiency=random.uniform(30, 40),
        anomaly=False,
        timestamp=datetime.now(),
    )
    metric.save()

try:
    while True:
        generate_metrics()
        print("Simulated data collected...")
        time.sleep(10)
except KeyboardInterrupt:
    print("Stopped metric generation.")
