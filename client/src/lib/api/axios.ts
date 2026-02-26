import axios from "axios";

// Use direct backend URL in both development and production
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://class-flow-server.vercel.app/api" // Direct backend URL
    : process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// =======================
// Request interceptor
// =======================
apiClient.interceptors.request.use(
  (config) => {
    // Add Authorization token from localStorage
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    if (process.env.NODE_ENV === "development") {
      console.log("📤", config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// =======================
// Response interceptor
// =======================
apiClient.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "✅",
        response.config.method?.toUpperCase(),
        response.config.url,
      );
    }
    return response;
  },

  (error) => {
    // 🚫 Token invalid / expired
    if (error.response?.status === 401) {
      // Clear auth data
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_data");
        localStorage.removeItem("auth_status");
        window.dispatchEvent(new Event("auth-expired"));
      }
    }

    // 🌐 Offline / Network error
    if (
      !error.response &&
      (error.code === "ERR_NETWORK" || error.message === "Network Error")
    ) {
      console.warn("📴 Network error");
    }

    return Promise.reject(error);
  },
);
