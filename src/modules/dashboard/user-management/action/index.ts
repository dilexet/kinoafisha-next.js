import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/modules/shared/utils/axios-creater";
import { USER_MANAGEMENT } from "@/modules/shared/constants/api-constants";
import { UpdateArgsType } from "@/modules/dashboard/user-management/types/update-args-type";
import { UserFieldCreateType } from "@/modules/dashboard/user-management/constants/user-field-values";

export const userGetAllActionAsync = createAsyncThunk(
  "user-management/getAll",
  async (query: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(USER_MANAGEMENT, { params: { name: query } });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const userGetOneActionAsync = createAsyncThunk(
  "user-management/getOne",
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(USER_MANAGEMENT + `/${id}`);
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const userUpdateAsync = createAsyncThunk(
  "user-management/update",
  async (updateArgs: UpdateArgsType, thunkAPI) => {
    try {
      const id = updateArgs.id;
      const response = await axiosInstance.put(
        USER_MANAGEMENT + `/${id}`,
        updateArgs.values);
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const userChangeBlockStatusAsync = createAsyncThunk(
  "user-management/change-block-status",
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(USER_MANAGEMENT + `/${id}`);
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const userCreateAsync = createAsyncThunk(
  "user-management/create",
  async (values: UserFieldCreateType, thunkAPI) => {
    try {
      const response = await axiosInstance.post(USER_MANAGEMENT, values);
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const userDeleteAsync = createAsyncThunk(
  "user-management/delete",
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(USER_MANAGEMENT + `/${id}`);
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);