import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const instance = axios.create({
  baseURL: API_BASE
});

export default {
  get: (path, token) =>
    instance.get(path, { headers: token ? { Authorization: `Bearer ${token}` } : undefined }),
  post: (path, body, token) =>
    instance.post(path, body, { headers: token ? { Authorization: `Bearer ${token}` } : undefined }),
  put: (path, body, token) =>
    instance.put(path, body, { headers: token ? { Authorization: `Bearer ${token}` } : undefined }),
  delete: (path, token) =>
    instance.delete(path, { headers: token ? { Authorization: `Bearer ${token}` } : undefined })
};
