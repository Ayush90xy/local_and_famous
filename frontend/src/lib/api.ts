import axios from 'axios';

// Always call relative API path — Nginx will proxy /api/* → backend
const API = '/api';

export const api = axios.create({ baseURL: API });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

