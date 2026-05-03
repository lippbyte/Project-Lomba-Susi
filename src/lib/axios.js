// src/lib/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  headers: { 'Accept': 'application/json' },
});

// Attach token dari localStorage ke setiap request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('susi_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 -> redirect ke login
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('susi_token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
