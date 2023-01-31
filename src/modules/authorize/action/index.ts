import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GOOGLE_AUTHORIZE_ENDPOINT,
  LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT, REFRESH_ENDPOINT,
  REGISTER_ENDPOINT,
} from "@/modules/shared/constants/api-constants";
import axiosInstance from "@/modules/shared/utils/axios-creater";
import { LoginActionArgs } from "@/modules/authorize/types/login/login-action-args";
import { RegisterActionArgs } from "@/modules/authorize/types/register/register-action-args";
import { getTokens, removeTokens, saveTokens } from "@/modules/authorize/utils/token-service";

export const loginActionAsync = createAsyncThunk(
  "authorize/login",
  async (loginActionArgs: LoginActionArgs, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        LOGIN_ENDPOINT, loginActionArgs.data,
      );
      saveTokens(loginActionArgs.rememberMe, response?.data);
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const registerActionAsync = createAsyncThunk(
  "authorize/register",
  async (registerActionArgs: RegisterActionArgs, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        REGISTER_ENDPOINT, registerActionArgs.data,
      );
      saveTokens(registerActionArgs.rememberMe, response?.data);
      return response?.data;
    } catch (err) {
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

      const response = await axiosInstance.post(
        LOGOUT_ENDPOINT, { refreshToken: tokens.refreshToken },
      );
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const refreshTokensAsync = createAsyncThunk(
  "authorize/refresh-tokens",
  async (arg, thunkAPI) => {
    try {
      const tokens = getTokens();

      const response = await axiosInstance.post(
        REFRESH_ENDPOINT, {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
      );

      saveTokens(tokens.rememberMe, response?.data);
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  });

export const googleAuthorizeAsync = createAsyncThunk(
  "authorize/google",
  async (token: string, thunkAPI) => {
    try {
      const response =
        await axiosInstance.post(
          GOOGLE_AUTHORIZE_ENDPOINT,
          { token: token });
      saveTokens(true, response?.data);
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  });