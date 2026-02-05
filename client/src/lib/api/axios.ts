import axios from "axios";

// In production (Vercel), use relative /api (proxied via Next.js rewrites)
// In development, use localhost:5000/api directly
const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? '/api'  // Same-origin via Next.js proxy
    : process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // HTTP-only cookie
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
    if (process.env.NODE_ENV === "development") {
      console.log(
        "📤",
        config.method?.toUpperCase(),
        config.url
      );
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
        response.config.url
      );
    }
    return response;
  },

  (error) => {
    // 🚫 Token invalid / expired
    if (error.response?.status === 401) {
      // Let Redux / UI decide what to do
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth-expired"));
      }
    }

    // 🌐 Offline / Network error
    if (
      !error.response &&
      (error.code === "ERR_NETWORK" ||
        error.message === "Network Error")
    ) {
      console.warn("📴 Network error");
    }

    return Promise.reject(error);
  }
);
