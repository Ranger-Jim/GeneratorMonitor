import React, { useEffect, useState } from "react";
import { fetchMetricDetails } from "../utils/api";

const MetricDetail = ({ metricId }) => {
  const [metricDetail, setMetricDetail] = useState(null);

  useEffect(() => {
    const getMetricDetail = async () => {
      try {
        const data = await fetchMetricDetails(metricId);
        setMetricDetail(data);
      } catch (error) {
        console.error("Failed to load metric details:", error);
      }
    };

    getMetricDetail();
  }, [metricId]); // Runs whenever the metricId changes

  if (!metricDetail) {
    return <p>Loading metric details...</p>;
  }

  return (
    <div>
      <h2>Metric Details for ID: {metricId}</h2>
      <pre>{JSON.stringify(metricDetail, null, 2)}</pre>
    </div>
  );
};

export default MetricDetail;
