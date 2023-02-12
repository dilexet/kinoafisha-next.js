import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GOOGLE_AUTHORIZE_ENDPOINT,
  LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT,
  REFRESH_ENDPOINT,
  REGISTER_ENDPOINT,
} from "@/modules/shared/constants/api-constants";
import axiosInstance from "@/modules/shared/utils/axios-creater";
import { LoginActionArgs } from "@/modules/authorize/types/login/login-action-args";
import { RegisterActionArgs } from "@/modules/authorize/types/register/register-action-args";
import {
  getTokens,
  removeTokens,
  saveTokens,
} from "@/modules/authorize/utils/token-service";
import { toastr } from "react-redux-toastr";
import { AxiosResponse } from "axios";

const title = "Authorize";
export const loginActionAsync = createAsyncThunk(
  "authorize/login",
  async (loginActionArgs: LoginActionArgs, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        LOGIN_ENDPOINT,
        loginActionArgs.data,
      );
      saveTokens(loginActionArgs.rememberMe, response?.data);
      toastr.success(title, "Login completed successfully");
      return response?.data;
    } catch (err) {
      toastr.error(title, "Login completed with error");
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const registerActionAsync = createAsyncThunk(
  "authorize/register",
  async (registerActionArgs: RegisterActionArgs, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        REGISTER_ENDPOINT,
        registerActionArgs.data,
      );
      saveTokens(registerActionArgs.rememberMe, response?.data);
      toastr.success(title, "Register completed successfully");
      return response?.data;
    } catch (err) {
      toastr.error(title, "Register completed with error");
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const logoutActionAsync = createAsyncThunk(
  "authorize/logout",
  async (arg, thunkAPI) => {
    try {
      const tokens = getTokens();
      removeTokens();

      const response = await axiosInstance.post(LOGOUT_ENDPOINT, {
        refreshToken: tokens.refreshToken,
      });
      toastr.success(title, "Logout completed successfully");
      return response?.data;
    } catch (err) {
      toastr.error(title, "Logout completed with error");
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const refreshTokensActionAsync = createAsyncThunk(
  "authorize/refresh-tokens",
  async (arg, thunkAPI) => {
    try {
      const response = await refreshTokensAsync();
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const googleAuthorizeAsync = createAsyncThunk(
  "authorize/google",
  async (token: string, thunkAPI) => {
    try {
      const response = await axiosInstance.post(GOOGLE_AUTHORIZE_ENDPOINT, {
        token: token,
      });
      saveTokens(true, response?.data);
      toastr.success(title, "Google authorize completed successfully");
      return response?.data;
    } catch (err) {
      toastr.success(title, "Google authorize completed with error");
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);


export async function refreshTokensAsync(): Promise<AxiosResponse<any, any>> {
  const tokens = getTokens();

  const response = await axiosInstance.post(REFRESH_ENDPOINT, {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  });

  saveTokens(tokens?.rememberMe, response?.data);

  return response;
}