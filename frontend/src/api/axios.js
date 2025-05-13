// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // we'll use dotenv for flexibility
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
