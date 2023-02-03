import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/modules/shared/utils/axios-creater";
import { CINEMA_MANAGEMENT } from "@/modules/shared/constants/api-constants";
import { UpdateArgsType } from "@/modules/dashboard/cinema-management/types/update-args-type";
import { CinemaFieldType } from "@/modules/dashboard/cinema-management/constants/cinema-field-values";

export const cinemaGetAllActionAsync = createAsyncThunk(
  "cinema-management/getAll",
  async (query: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(CINEMA_MANAGEMENT, { params: { name: query } });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const cinemaGetOneActionAsync = createAsyncThunk(
  "cinema-management/getOne",
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(CINEMA_MANAGEMENT + `/${id}`);
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const cinemaUpdateAsync = createAsyncThunk(
  "cinema-management/update",
  async (updateArgs: UpdateArgsType, thunkAPI) => {
    try {
      const id = updateArgs.id;
      const response = await axiosInstance.put(
        CINEMA_MANAGEMENT + `/${id}`,
        updateArgs.values);
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const cinemaCreateAsync = createAsyncThunk(
  "cinema-management/create",
  async (values: CinemaFieldType, thunkAPI) => {
    try {
      const response = await axiosInstance.post(CINEMA_MANAGEMENT, values);
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const cinemaDeleteAsync = createAsyncThunk(
  "cinema-management/delete",
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(CINEMA_MANAGEMENT + `/${id}`);
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);