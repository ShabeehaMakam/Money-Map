import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add token from localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global error handling
let isRedirecting = false;

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;

    if (status === 401 && !isRedirecting) {
      isRedirecting = true;
      console.warn("Unauthorized - redirecting to login");
      window.location.href = "/login";
    } else if (status === 500) {
      console.error("Server error. Please try again later.");
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again...");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
