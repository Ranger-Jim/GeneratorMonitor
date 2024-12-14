import axios from 'axios';

// Base URL for the API
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

// Function to fetch all metrics
export const fetchMetrics = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/metrics/`);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching metrics:", error);
    throw error; // Rethrow the error so the calling code can handle it
  }
};

// Function to fetch detailed data for a specific metric by ID
export const fetchMetricDetails = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/metrics/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching metric details for ID ${id}:`, error);
    throw error;
  }
};

// Function to fetch dashboard stats (optional)
export const fetchDashboardStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/metrics/stats/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
};
