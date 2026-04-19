import axios from "axios";

const API = "https://job-on-campus-backend.onrender.com/api";
//const API = "http://localhost:8000/api";
//const API = "http://192.168.0.16:8000/api";
const api = axios.create({
  baseURL: API,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;