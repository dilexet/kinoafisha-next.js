import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/modules/shared/utils/axios-creater";
import { MOVIES } from "@/modules/shared/constants/api-constants";

export const moviesGetAllAsync = createAsyncThunk(
  "movies/getAll",
  async (arg, thunkAPI) => {
    try {
      const response = await axiosInstance.get(MOVIES);
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);