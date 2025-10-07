import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api",
});

// Add JWT automatically for protected routes
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("techToken");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const registerTechnician = (data) => API.post("/technicians/register", data);
export const loginTechnician = (data) => API.post("/technicians/login", data);
export const getTechnicianProfile = () => API.get("/technicians/profile");
