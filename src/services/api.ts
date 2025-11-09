import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // your Spring Boot backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token (if available)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
