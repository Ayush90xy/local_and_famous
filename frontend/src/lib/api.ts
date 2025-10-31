// src/lib/api.ts (or wherever your axios client lives)
import axios from 'axios';

// In dev, use VITE_API_BASE or localhost; in prod, use relative '/api'
const API_BASE = import.meta.env.DEV
  ? (import.meta.env.VITE_API_BASE || 'http://localhost:4000')
  : '/api';

export const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
