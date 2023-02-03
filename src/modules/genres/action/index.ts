import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/modules/shared/utils/axios-creater";
import { GENRES } from "@/modules/shared/constants/api-constants";

export const genresGetAllAsync = createAsyncThunk(
  "genres/getAll",
  async (arg, thunkAPI) => {
    try {
      const response = await axiosInstance.get(GENRES);
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);