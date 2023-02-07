import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/modules/shared/utils/axios-creater";
import { CINEMAS } from "@/modules/shared/constants/api-constants";

export const cinemasGetAllAsync = createAsyncThunk(
  "cinemas/getAll",
  async (arg, thunkAPI) => {
    try {
      const response = await axiosInstance.get(CINEMAS);
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);
