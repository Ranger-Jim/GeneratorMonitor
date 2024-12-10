from djongo import models

# Create your models here.
class Metric(models.Model):
  primary_coolant_pressure = models.FloatField()
  steam_pressure = models.FloatField()
  primary_coolant_temperature = models.FloatField()
  steam_temperature = models.FloatField()
  feedwater_flow_rate = models.FloatField()
  thermal_efficiency = models.FloatField()
  anomaly = models.BooleanField(default=False)
  timestamp = models.DateTimeField(auto_now_add=True)

  objects = models.DjongoManager()

  def __str__(self):
    return f"Metric recorded at {self.timestamp}"

