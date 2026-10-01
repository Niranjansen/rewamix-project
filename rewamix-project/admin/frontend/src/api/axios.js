import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/admin";

const api = axios.create({
  baseURL: API_URL,
});

// Attach the admin's own token (kept separate from the customer site's token)
api.interceptors.request.use((config) => {
  const adminInfo = localStorage.getItem("rewamix_admin");
  if (adminInfo) {
    const { token } = JSON.parse(adminInfo);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// If the token is invalid/expired, bounce back to the admin login screen
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("rewamix_admin");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
