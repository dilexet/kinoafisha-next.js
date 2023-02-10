import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/modules/shared/utils/axios-creater";
import { MOVIE_FILTER } from "@/modules/shared/constants/api-constants";

export const movieWithSessionsGetAsync = createAsyncThunk(
  "movie-sessions/get",
  async (movieId: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${MOVIE_FILTER}/${movieId}`);
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);