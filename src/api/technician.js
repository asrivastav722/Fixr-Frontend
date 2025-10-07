import axios from "axios";
import constants from "../utils/constants";

const API = axios.create({
  baseURL: constants.BASE_URL,
});

// Add JWT automatically for protected routes
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("techToken");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const registerTechnician = (data) => API.post("technicians/register", data);
export const loginTechnician = (data) => API.post("technicians/login", data);
export const getTechnicianProfile = () => API.get("technicians/profile");
