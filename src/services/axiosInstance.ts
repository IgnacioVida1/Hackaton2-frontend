import axios from "axios";
import { getToken } from "../services/tokenUtils";

const axiosInstance = axios.create({
  baseURL: "http://198.211.105.95:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
