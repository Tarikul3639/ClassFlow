import axios from 'axios';

// Next.js environment variable (must start with NEXT_PUBLIC_)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Set auth token helper
export const setAuthToken = (access_token: string | null) => {
  if (access_token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// Request interceptor - auto-add token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const access_token = localStorage.getItem('access_token');
      if (access_token) {
        setAuthToken(access_token);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        setAuthToken(null);
        window.location.href = '/auth/sign-in';
      }
    }
    return Promise.reject(error);
  }
);