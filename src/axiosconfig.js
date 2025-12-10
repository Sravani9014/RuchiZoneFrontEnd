// src/axios.config.js
import axios from "axios";

const api = axios.create({
 baseURL: "https://extraordinary-kitsune-4b6eda.netlify.app",
 // your backend URL
});

// 🔐 Attach JWT token automatically for every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);





export default api;
