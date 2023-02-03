import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/modules/shared/utils/axios-creater";
import { MOVIE_MANAGEMENT } from "@/modules/shared/constants/api-constants";
import { UpdateArgsType } from "@/modules/dashboard/movie-management/types/update-args-type";
import { MovieFieldType } from "@/modules/dashboard/movie-management/constants/movie-field-values";

export const movieGetAllActionAsync = createAsyncThunk(
  "movie-management/getAll",
  async (query: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(MOVIE_MANAGEMENT, { params: { name: query } });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const movieGetOneActionAsync = createAsyncThunk(
  "movie-management/getOne",
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(MOVIE_MANAGEMENT + `/${id}`);
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const movieUpdateAsync = createAsyncThunk(
  "movie-management/update",
  async (updateArgs: UpdateArgsType, thunkAPI) => {
    try {
      const id = updateArgs.id;
      const response = await axiosInstance.put(
        MOVIE_MANAGEMENT + `/${id}`,
        updateArgs.values);
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const movieCreateAsync = createAsyncThunk(
  "movie-management/create",
  async (values: MovieFieldType, thunkAPI) => {
    try {
      const response = await axiosInstance.post(MOVIE_MANAGEMENT, values);
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const movieDeleteAsync = createAsyncThunk(
  "movie-management/delete",
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(MOVIE_MANAGEMENT + `/${id}`);
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);