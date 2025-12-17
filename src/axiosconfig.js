// src/axios.config.js
import axios from "axios";

const api = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:3000", // your backend URL
=======
 baseURL: "https://ruchi-zone-backend.vercel.app/",
 // your backend URL
>>>>>>> d5fd718a875740685a15caa67974facf47fe8d50
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
