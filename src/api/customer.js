import axios from "axios";
import constants from "../utils/constants";

const API = axios.create({
  baseURL: constants.BASE_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const registerCustomer = (data) => API.post("auth/register", data);
export const loginCustomer = (data) => API.post("auth/login", data);
export const getCustomerProfile = () => API.get("auth/profile");
