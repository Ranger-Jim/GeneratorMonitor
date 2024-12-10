import os
import django
import sys

# Add the 'backend' folder to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), "backend"))

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nuclear_monitoring.settings')

print("Python Path:", sys.path)
print("Working Directory:", os.getcwd())

# Set up Django
django.setup()

from monitoring.models import Metric
import random
import time

def generate_metrics():
    while True:
        metric = Metric(
            primary_coolant_pressure=round(random.uniform(2000, 2500), 2),
            steam_pressure=round(random.uniform(900, 1200), 2),
            primary_coolant_temperature=round(random.uniform(550, 650), 2),
            steam_temperature=round(random.uniform(500, 600), 2),
            feedwater_flow_rate=round(random.uniform(1000, 2000), 2),
            thermal_efficiency=round(random.uniform(30, 35), 2),
        )
        metric.save()
        print(f"Saved metric at {metric.timestamp}")
        time.sleep(10)

if __name__ == "__main__":
    generate_metrics()