import axios from "axios";
import {
  API_URL,
  AUTHORIZE,
  IMAGE_UPLOAD,
} from "@/modules/shared/constants/api-constants";
import { refreshTokensAsync } from "@/modules/authorize/action";
import {
  getTokens,
  removeTokens,
} from "@/modules/authorize/utils/token-service";
import Router from "next/router";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export default axiosInstance;

axiosInstance.interceptors.request.use(
  async (config) => {
    if (!config.url.includes(AUTHORIZE)) {
      const tokens = getTokens();
      if (tokens) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${tokens.accessToken}`,
          Accept: "*/*",
        };
        if (config.url.includes(IMAGE_UPLOAD)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${tokens.accessToken}`,
            Accept: "*/*",
          };
        }
      }
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
    const originalRequest = error.config;
    if (
      !originalRequest.url.includes(AUTHORIZE) &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await refreshTokensAsync();
        const tokens = getTokens();
        if (tokens) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${tokens.accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (err) {
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          removeTokens();
          await Router.push("/login");
        }
      }
    }

    return Promise.reject(error);
  },
);
