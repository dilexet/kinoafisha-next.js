import { createAsyncThunk } from "@reduxjs/toolkit";
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from "@/shared/constants/api-constants";
import axiosInstance from "@/shared/utils/axios-creater";
import { LoginData } from "@/authorize/types/login-data";
import { RegisterData } from "@/authorize/types/register-data";

export const loginActionAsync = createAsyncThunk(
  "authorize/login",
  async (loginData: LoginData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        LOGIN_ENDPOINT, loginData,
      );
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const registerActionAsync = createAsyncThunk(
  "authorize/register",
  async (registerData: RegisterData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        REGISTER_ENDPOINT, registerData,
      );
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);