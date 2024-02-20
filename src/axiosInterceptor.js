import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "./services/authenticationService";
import baseUrl from "./services/baseURL";


export const customAxios = axios.create({
  baseURL: `${baseUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});

customAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status >= 400 && error.response.status < 500) {
      // Client errors (4xx)
      toast.warning(error.response.data.message);
    } else if (error.response.status >= 500) {
      // Server errors (5xx)
      toast.error(error.response.data.message || "Server Error");
    } else {
      // Handle other errors
      toast.error("An unexpected error occurred");
    }
    return Promise.reject(error);
  }
);
