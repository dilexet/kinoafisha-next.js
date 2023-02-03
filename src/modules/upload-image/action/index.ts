import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/modules/shared/utils/axios-creater";
import { IMAGE_UPLOAD } from "@/modules/shared/constants/api-constants";

export const uploadImageAsync = createAsyncThunk(
  "image/upload",
  async (file: FormData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(IMAGE_UPLOAD, file);
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);