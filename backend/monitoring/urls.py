from django.urls import path
from .views import MetricListView, MetricDetailView, MetricStatsView

urlpatterns = [
  path('metrics/', MetricListView.as_view(), name='metric-list'),
  path('metrics/<int:pk>/', MetricDetailView.as_view(), name='metric-detail'),
  path('metrics/stats/', MetricStatsView.as_view(), name='metric-stats'),
]