import axios from "axios";

// Next.js environment variable (must start with NEXT_PUBLIC_)
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Set auth token helper
export const setAuthToken = (access_token: string | null) => {
  if (access_token) {
    apiClient.defaults.headers.common["Authorization"] =
      `Bearer ${access_token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

// Request interceptor - auto-add token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        setAuthToken(access_token);
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor - handle 401 and offline mode
apiClient.interceptors.response.use(
  (response) => {
    // Cache successful GET requests
    if (typeof window !== "undefined" && response.config.method === "get") {
      caches
        .open("api-cache-v1")
        .then((cache) => {
          const cacheKey = response.config.url || "";
          cache.put(cacheKey, new Response(JSON.stringify(response.data)));
        })
        .catch((error) => {
          console.warn("Failed to cache response:", error);
        });
    }
    return response;
  },
  async (error) => {
    // Handle 401
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // navigate to sign-in page
        if (navigator.onLine) {
          localStorage.removeItem("access_token");
          setAuthToken(null);
          window.location.href = "/auth/sign-in";
        } else {
          // Just clear token in offline mode
          setAuthToken(null); // API request failed due to 401
          // localStorage is not cleared to allow retry when back online
        }
      }
    }

    // Handle offline mode
    if (!error.response && error.message === "Network Error") {
      if (typeof window !== "undefined") {
        try {
          const cache = await caches.open("api-cache-v1");
          const cacheKey = error.config.url || "";
          const cachedResponse = await cache.match(cacheKey);

          if (cachedResponse) {
            const data = await cachedResponse.json();
            return {
              data,
              status: 200,
              statusText: "OK (from cache)",
              headers: {},
              config: error.config,
              fromCache: true,
            };
          }
        } catch (cacheError) {
          console.warn("Failed to retrieve from cache:", cacheError);
        }
      }
    }

    return Promise.reject(error);
  },
);
