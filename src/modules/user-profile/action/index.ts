import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/modules/shared/utils/axios-creater";
import { USER_PROFILE } from "@/modules/shared/constants/api-constants";
import { toastr } from "react-redux-toastr";
import { UserProfileUpdateArgs } from "@/modules/user-profile/types/user-profile-update-args";

export const userProfileGetActionAsync = createAsyncThunk(
  "profile/get",
  async (userProfileId: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${USER_PROFILE}/${userProfileId}`);
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  },
);

export const userProfileUpdateActionAsync = createAsyncThunk(
  "profile/update",
  async (args: UserProfileUpdateArgs, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`${USER_PROFILE}/${args.userProfileId}`, args);
      toastr.success("User profile", "Update completed successfully");
      return response?.data;
    } catch (err) {
      toastr.error("User profile", "Update completed with error");
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);