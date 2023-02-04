import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/modules/shared/utils/axios-creater";
import { ROLES } from "@/modules/shared/constants/api-constants";

export const rolesGetAllAsync = createAsyncThunk(
  "roles/getAll",
  async (arg, thunkAPI) => {
    try {
      const response = await axiosInstance.get(ROLES);
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);