import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/modules/shared/utils/axios-creater";
import { HALL_MANAGEMENT } from "@/modules/shared/constants/api-constants";
import toastrNotification from "@/modules/dashboard/shared/utils/toastr-notification";
import { ActionSuccessMessages, ActionErrorMessages } from "@/modules/dashboard/shared/enums/action-messages";
import ActionStatuses from "@/modules/dashboard/shared/enums/action-statuses";
import { UpdateArgsType } from "@/modules/dashboard/hall-management/types/update-args-type";
import { HallFieldsType } from "@/modules/dashboard/hall-management/types/hall-field-types";

const title = "Hall management";

export const hallGetAllActionAsync = createAsyncThunk(
  "hall-management/getAll",
  async (query: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(HALL_MANAGEMENT, { params: { name: query } });
      return response?.data;
    } catch (err) {
      toastrNotification(title, ActionErrorMessages.GET, ActionStatuses.ERROR);
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const hallGetOneActionAsync = createAsyncThunk(
  "hall-management/getOne",
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(HALL_MANAGEMENT + `/${id}`);
      return response?.data;
    } catch (err) {
      toastrNotification(title, ActionErrorMessages.GET, ActionStatuses.ERROR);
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const hallUpdateAsync = createAsyncThunk(
  "hall-management/update",
  async (updateArgs: UpdateArgsType, thunkAPI) => {
    try {
      const id = updateArgs.id;
      const response = await axiosInstance.put(
        HALL_MANAGEMENT + `/${id}`, updateArgs.values);
      toastrNotification(title, ActionSuccessMessages.UPDATE, ActionStatuses.SUCCESS);
      return response?.data;
    } catch (err) {
      toastrNotification(title, ActionErrorMessages.UPDATE, ActionStatuses.ERROR);
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const hallCreateAsync = createAsyncThunk(
  "hall-management/create",
  async (values: HallFieldsType, thunkAPI) => {
    try {
      const response = await axiosInstance.post(HALL_MANAGEMENT, values);
      toastrNotification(title, ActionSuccessMessages.CREATE, ActionStatuses.SUCCESS);
      return response?.data;
    } catch (err) {
      toastrNotification(title, ActionErrorMessages.CREATE, ActionStatuses.ERROR);
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const hallDeleteAsync = createAsyncThunk(
  "hall-management/delete",
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(HALL_MANAGEMENT + `/${id}`);
      toastrNotification(title, ActionSuccessMessages.DELETE, ActionStatuses.SUCCESS);
      return response?.data;
    } catch (err) {
      toastrNotification(title, ActionErrorMessages.DELETE, ActionStatuses.ERROR);
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);