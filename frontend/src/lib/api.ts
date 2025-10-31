
import axios from 'axios';
const API = import.meta.env.VITE_API_BASE || 'https://p01--backend--n26b64hcs22c.code.run/';
export const api = axios.create({ baseURL: API });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
