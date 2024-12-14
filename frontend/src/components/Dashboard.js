import React, { useEffect, useState } from "react";
import { fetchMetrics } from "../utils/api";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import './Dashboard.css';

const Dashboard = () => {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMetrics = async () => {
      try {
        const data = await fetchMetrics();

        // Sort by timestamp and get the 50 most recent entries
        const sortedData = data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        const recentData = sortedData.slice(0, 50).reverse(); // Reverse to maintain chronological order

        setMetrics(recentData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load metrics:", error);
        setLoading(false);
      }
    };

    // Fetch data initially
    getMetrics();

    // Set up polling to fetch new data every 10 seconds
    const intervalId = setInterval(() => {
      getMetrics();
    }, 10000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Runs once when the component mounts

  if (loading) {
    return <p>Loading metrics...</p>;
  }

  return (
    <div>
      <h1>Generator 1 Dashboard</h1>
      
      {/* Graphs Container */}
      <div className="graphs-container">
        {/* Pressures Graph */}
        <div className="graph-item">
          <h2>Pressure</h2>
          <LineChart
            width={800}
            height={300}
            data={metrics}
            margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
          >
            <CartesianGrid stroke="#000000" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
            />
            <YAxis label={{ value: 'Pressure (MPa)', angle: -90, position: 'left', dx: 10, dy: -70 }} />
            <Tooltip
              labelFormatter={(label) => new Date(label).toLocaleString()}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="primary_coolant_pressure"
              stroke="#8884d8"
              name="Coolant Pressure"
            />
            <Line
              type="monotone"
              dataKey="steam_pressure"
              stroke="#82ca9d"
              name="Steam Pressure"
            />
          </LineChart>
        </div>

        {/* Temperature Graph */}
        <div className="graph-item">
          <h2>Temperature</h2>
          <LineChart
            width={800}
            height={300}
            data={metrics}
            margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
          >
            <CartesianGrid stroke="#000000" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
            />
            <YAxis label={{ value: 'Temperature (°C)', angle: -90, position: 'left', dx: 10, dy: -70 }} />
            <Tooltip
              labelFormatter={(label) => new Date(label).toLocaleString()}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="primary_coolant_temperature"
              stroke="#8884d8"
              name="Coolant Temperature"
            />
            <Line
              type="monotone"
              dataKey="steam_temperature"
              stroke="#82ca9d"
              name="Steam Temperature"
            />
          </LineChart>
        </div>

        {/* Feedwater Flow Rate Graph */}
        <div className="graph-item">
          <h2>Feedwater Flow Rate</h2>
          <LineChart
            width={800}
            height={300}
            data={metrics}
            margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
          >
            <CartesianGrid stroke="#000000" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
            />
            <YAxis label={{ value: 'Feedwater Flow Rate (L/s)', angle: -90, position: 'left', dx: 10, dy: -90 }} />
            <Tooltip
              labelFormatter={(label) => new Date(label).toLocaleString()}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="feedwater_flow_rate"
              stroke="#8884d8"
              name="Feedwater Flow Rate"
            />
          </LineChart>
        </div>

        {/* Thermal Efficiency Graph */}
        <div className="graph-item">
          <h2>Thermal Efficiency</h2>
          <LineChart
            width={800}
            height={300}
            data={metrics}
            margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
          >
            <CartesianGrid stroke="#000000" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
            />
            <YAxis label={{ value: 'Thermal Efficiency (%)', angle: -90, position: 'left', dx: 10, dy: -90 }} />
            <Tooltip
              labelFormatter={(label) => new Date(label).toLocaleString()}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="thermal_efficiency"
              stroke="#8884d8"
              name="Thermal Efficiency"
            />
          </LineChart>
        </div>
      </div>

      {/* Metrics Table */}
      <table className="metrics-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Primary Coolant Pressure (MPa)</th>
            <th>Steam Pressure (MPa)</th>
            <th>Primary Coolant Temperature (°C)</th>
            <th>Steam Temperature (°C)</th>
            <th>Feedwater Flow Rate (L/s)</th>
            <th>Thermal Efficiency (%)</th>
            <th>Anomaly</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {metrics.slice().reverse().map((metric) => (
            <tr key={metric.id}>
              <td>{metric.id}</td>
              <td>{metric.primary_coolant_pressure.toFixed(2)}</td>
              <td>{metric.steam_pressure.toFixed(2)}</td>
              <td>{metric.primary_coolant_temperature.toFixed(2)}</td>
              <td>{metric.steam_temperature.toFixed(2)}</td>
              <td>{metric.feedwater_flow_rate.toFixed(2)}</td>
              <td>{metric.thermal_efficiency.toFixed(2)}</td>
              <td>{metric.anomaly ? "Yes" : "No"}</td>
              <td>{new Date(metric.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );
};

export default Dashboard;
