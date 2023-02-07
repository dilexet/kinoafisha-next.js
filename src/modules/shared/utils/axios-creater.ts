import axios from "axios";
import {
  API_URL,
  IMAGE_UPLOAD,
} from "@/modules/shared/constants/api-constants";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export default axiosInstance;

axiosInstance.interceptors.request.use(
  async (config) => {
    if (config.url.includes(IMAGE_UPLOAD)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      config.headers = {
        ...config.headers,
        Accept: "*/*",
        "Content-Type": "multipart/form-data",
      };
    }
    return config;
  },
  (error) => {
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
