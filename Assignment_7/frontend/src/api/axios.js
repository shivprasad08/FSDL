import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: false,
});

// Add interceptors if needed
// api.interceptors.request.use(...)
// api.interceptors.response.use(...)

export default api;
