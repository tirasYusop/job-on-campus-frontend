import axios from "axios";

const API = "https://job-on-campus-backend.onrender.com/api";
//const API = "http://localhost:8000/api";
const api = axios.create({
  baseURL: API,
  withCredentials: true,
});

export default api;