import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/modules/shared/utils/axios-creater";
import { SESSION_MANAGEMENT } from "@/modules/shared/constants/api-constants";
import toastrNotification from "@/modules/dashboard/shared/utils/toastr-notification";
import {
  ActionSuccessMessages,
  ActionErrorMessages,
} from "@/modules/dashboard/shared/enums/action-messages";
import ActionStatuses from "@/modules/dashboard/shared/enums/action-statuses";
import { UpdateArgsType } from "@/modules/dashboard/session-management/types/update-args-type";
import { SessionCreateFieldsType } from "@/modules/dashboard/session-management/types/session-field-types";
import { toastr } from "react-redux-toastr";

const title = "Session management";

export const sessionGetAllActionAsync = createAsyncThunk(
  "session-management/getAll",
  async (query: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(SESSION_MANAGEMENT, {
        params: { name: query },
      });
      return response?.data;
    } catch (err) {
      toastrNotification(title, ActionErrorMessages.GET, ActionStatuses.ERROR);
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const sessionGetOneActionAsync = createAsyncThunk(
  "session-management/getOne",
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(SESSION_MANAGEMENT + `/${id}`);
      return response?.data;
    } catch (err) {
      toastrNotification(title, ActionErrorMessages.GET, ActionStatuses.ERROR);
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const sessionUpdateAsync = createAsyncThunk(
  "session-management/update",
  async (updateArgs: UpdateArgsType, thunkAPI) => {
    try {
      const id = updateArgs.id;
      const response = await axiosInstance.put(
        SESSION_MANAGEMENT + `/${id}`,
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

export const sessionCreateAsync = createAsyncThunk(
  "session-management/create",
  async (values: SessionCreateFieldsType, thunkAPI) => {
    try {
      const response = await axiosInstance.post(SESSION_MANAGEMENT, values);
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

export const sessionDeleteAsync = createAsyncThunk(
  "session-management/delete",
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(
        SESSION_MANAGEMENT + `/${id}`,
      );
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

export const sessionSeatRemoveFromBookingAsync = createAsyncThunk(
  "session-management/remove-from-booking",
  async (seatId: string, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        SESSION_MANAGEMENT + `/${seatId}`,
      );
      toastr.success(
        title,
        "Session seat removed from booking completed successfully",
      );
      return response?.data;
    } catch (err) {
      toastr.error(
        title,
        "Session seat removed from booking completed with error",
      );
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);
