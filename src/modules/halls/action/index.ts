import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/modules/shared/utils/axios-creater";
import { HALLS } from "@/modules/shared/constants/api-constants";

export const hallsGetAllAsync = createAsyncThunk(
  "halls/getAll",
  async (cinemaId: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(HALLS + `/${cinemaId}`);
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);