import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/modules/shared/utils/axios-creater";
import { MOVIE_AFISHA } from "@/modules/shared/constants/api-constants";
import { MovieQuery } from "@/modules/afisha/types/movie-query";

export const moviesAfishaGetAllAsync = createAsyncThunk(
  "movie-afisha/getAll",
  async (query: MovieQuery, thunkAPI) => {
    try {
      const response = await axiosInstance.get(MOVIE_AFISHA, {
        params: { ...query },
      });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const moviesAfishaUploadAsync = createAsyncThunk(
  "movie-afisha/upload",
  async (query: MovieQuery, thunkAPI) => {
    try {
      const response = await axiosInstance.get(MOVIE_AFISHA, {
        params: { ...query },
      });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);
