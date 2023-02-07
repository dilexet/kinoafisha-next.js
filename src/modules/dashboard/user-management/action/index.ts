import { createAsyncThunk } from "@reduxjs/toolkit";
import { toastr } from "react-redux-toastr";
import axiosInstance from "@/modules/shared/utils/axios-creater";
import { USER_MANAGEMENT } from "@/modules/shared/constants/api-constants";
import { UpdateArgsType } from "@/modules/dashboard/user-management/types/update-args-type";
import { UserFieldCreateType } from "@/modules/dashboard/user-management/constants/user-field-values";
import ActionStatuses from "@/modules/dashboard/shared/enums/action-statuses";
import {
  ActionSuccessMessages,
  ActionErrorMessages,
} from "@/modules/dashboard/shared/enums/action-messages";
import toastrNotification from "@/modules/dashboard/shared/utils/toastr-notification";

const title = "User management";

export const userGetAllActionAsync = createAsyncThunk(
  "user-management/getAll",
  async (query: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(USER_MANAGEMENT, {
        params: { name: query },
      });
      return response?.data;
    } catch (err) {
      toastrNotification(title, ActionErrorMessages.GET, ActionStatuses.ERROR);
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const userGetOneActionAsync = createAsyncThunk(
  "user-management/getOne",
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(USER_MANAGEMENT + `/${id}`);
      return response?.data;
    } catch (err) {
      toastrNotification(title, ActionErrorMessages.GET, ActionStatuses.ERROR);
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const userUpdateAsync = createAsyncThunk(
  "user-management/update",
  async (updateArgs: UpdateArgsType, thunkAPI) => {
    try {
      const id = updateArgs.id;
      const response = await axiosInstance.put(
        USER_MANAGEMENT + `/${id}`,
        updateArgs.values,
      );
      toastrNotification(
        title,
        ActionSuccessMessages.UPDATE,
        ActionStatuses.SUCCESS,
      );
      return response?.data;
    } catch (err) {
      toastrNotification(
        title,
        ActionErrorMessages.UPDATE,
        ActionStatuses.ERROR,
      );
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const userChangeBlockStatusAsync = createAsyncThunk(
  "user-management/change-block-status",
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(USER_MANAGEMENT + `/${id}`);
      toastr.success(title, "Changed block status completed successfully");
      return response?.data;
    } catch (err) {
      toastr.error(title, "Changed block status completed with error");
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const userCreateAsync = createAsyncThunk(
  "user-management/create",
  async (values: UserFieldCreateType, thunkAPI) => {
    try {
      const response = await axiosInstance.post(USER_MANAGEMENT, values);
      toastrNotification(
        title,
        ActionSuccessMessages.CREATE,
        ActionStatuses.SUCCESS,
      );
      return response?.data;
    } catch (err) {
      toastrNotification(
        title,
        ActionErrorMessages.CREATE,
        ActionStatuses.ERROR,
      );
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const userDeleteAsync = createAsyncThunk(
  "user-management/delete",
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(USER_MANAGEMENT + `/${id}`);
      toastrNotification(
        title,
        ActionSuccessMessages.DELETE,
        ActionStatuses.SUCCESS,
      );
      return response?.data;
    } catch (err) {
      toastrNotification(
        title,
        ActionErrorMessages.DELETE,
        ActionStatuses.ERROR,
      );
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);
