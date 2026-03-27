import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || "";
    const isAuthCheck = requestUrl.includes("/auth/check");
    const isAuthPage = ["/login", "/register"].includes(window.location.pathname);

    if (error.response?.status === 401 && !isAuthCheck && !isAuthPage) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
