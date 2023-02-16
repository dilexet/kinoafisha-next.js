import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/modules/shared/utils/axios-creater";
import { MOVIE_FILTER } from "@/modules/shared/constants/api-constants";
import { MovieFilterQuery } from "@/modules/home/types/movie-filter-query";

export const moviesFilterGetAllAsync = createAsyncThunk(
  "movie-filter/getAll",
  async (query: MovieFilterQuery, thunkAPI) => {
    try {
      const response = await axiosInstance.get(MOVIE_FILTER, {
        params: { ...query },
      });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);
