import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/modules/shared/utils/axios-creater";
import { SEAT_TYPES } from "@/modules/shared/constants/api-constants";

export const seatTypesGetAllAsync = createAsyncThunk(
  "seat-types/getAll",
  async (arg, thunkAPI) => {
    try {
      const response = await axiosInstance.get(SEAT_TYPES);
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);