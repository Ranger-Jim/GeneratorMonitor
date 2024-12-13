
from rest_framework.generics import ListAPIView, RetrieveAPIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from django.db.models import Avg
from .models import Metric
from .serializers import MetricSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

# Retrieve all metrics with optional filtering and ordering
class MetricListView(ListAPIView):
  queryset = Metric.objects.all()
  serializer_class = MetricSerializer
  filter_backends = [DjangoFilterBackend, OrderingFilter]
  filterset_fields = ['anomaly', 'timestamp']
  ordering_fields = ['timestamp']
  ordering = ['-timestamp'] # Default: Latest first

# Retrieve a specific metric by ID
class MetricDetailView(RetrieveAPIView):
  queryset = Metric.objects.all()
  serializer_class = MetricSerializer

# Adding stats endpoints
class MetricStatsView(APIView):
  def get(self, request):
    total_metrics = Metric.objects.count()
    total_anomalies = Metric.objects.filter(anomaly=True).count()
    avg_efficiency = Metric.objects.aggregate(avg_efficiency=Avg('thermal_efficiency'))['avg_efficiency']

    return Response({
      'total_metrics': total_metrics,
      'total_anomalies': total_anomalies,
      'average_efficiency': avg_efficiency
    })
