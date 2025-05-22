import axios from "axios";
import Router from "next/router"; // To handle routing in Next.js

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => {
    // Return response if it is successful
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token from localStorage
      localStorage.removeItem("token");

      // Redirect to the home page or login page
      Router.push("/"); // Or you can use "/login" if you prefer to redirect to login page
    }
    return Promise.reject(error);
  }
);

export { api };
