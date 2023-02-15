import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/modules/shared/utils/axios-creater";
import { BOOKING } from "@/modules/shared/constants/api-constants";

export const sessionDetailsGetAsync = createAsyncThunk(
  "booking/get",
  async (sessionId: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${BOOKING}/${sessionId}`);
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);
