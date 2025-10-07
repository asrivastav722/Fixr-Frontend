import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const registerCustomer = (data) => API.post("/auth/register", data);
export const loginCustomer = (data) => API.post("/auth/login", data);
export const getCustomerProfile = () => API.get("/auth/profile");
