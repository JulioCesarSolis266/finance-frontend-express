// This file sets up an Axios instance for making API requests, with a base URL and an interceptor to include the authorization token in the headers of each request.
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
});
console.log(import.meta.env.VITE_API_URL);
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
