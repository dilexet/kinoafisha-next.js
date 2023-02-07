import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/modules/shared/utils/axios-creater";
import { COUNTRIES } from "@/modules/shared/constants/api-constants";

export const countriesGetAllAsync = createAsyncThunk(
  "countries/getAll",
  async (query: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(COUNTRIES, {
        params: { countryName: query },
      });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);
