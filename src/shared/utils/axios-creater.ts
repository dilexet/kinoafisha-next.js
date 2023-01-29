import axios from "axios";
import { API_URL } from "@/shared/constants/api-constants";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export default axiosInstance;

axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  error => {
    return error;
  },
);

axiosInstance.interceptors.response.use(
  async (response) => {
    return Promise.resolve(response);
  },
  async (error) => {
    return Promise.reject(error);
  },
);
