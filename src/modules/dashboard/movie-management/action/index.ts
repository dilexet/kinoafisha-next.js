import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/modules/shared/utils/axios-creater";
import { MOVIE_MANAGEMENT } from "@/modules/shared/constants/api-constants";
import { UpdateArgsType } from "@/modules/dashboard/movie-management/types/update-args-type";
import { MovieFieldType } from "@/modules/dashboard/movie-management/constants/movie-field-values";
import toastrNotification from "@/modules/dashboard/shared/utils/toastr-notification";
import { ActionSuccessMessages, ActionErrorMessages } from "@/modules/dashboard/shared/enums/action-messages";
import ActionStatuses from "@/modules/dashboard/shared/enums/action-statuses";

const title = "Movie management";

export const movieGetAllActionAsync = createAsyncThunk(
  "movie-management/getAll",
  async (query: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(MOVIE_MANAGEMENT, { params: { name: query } });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const movieGetOneActionAsync = createAsyncThunk(
  "movie-management/getOne",
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(MOVIE_MANAGEMENT + `/${id}`);
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const movieUpdateAsync = createAsyncThunk(
  "movie-management/update",
  async (updateArgs: UpdateArgsType, thunkAPI) => {
    try {
      const id = updateArgs.id;
      const response = await axiosInstance.put(
        MOVIE_MANAGEMENT + `/${id}`,
        updateArgs.values);
      toastrNotification(title, ActionSuccessMessages.UPDATE, ActionStatuses.SUCCESS);
      return response?.data;
    } catch (err) {
      toastrNotification(title, ActionErrorMessages.UPDATE, ActionStatuses.ERROR);
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const movieCreateAsync = createAsyncThunk(
  "movie-management/create",
  async (values: MovieFieldType, thunkAPI) => {
    try {
      const response = await axiosInstance.post(MOVIE_MANAGEMENT, values);
      toastrNotification(title, ActionSuccessMessages.CREATE, ActionStatuses.SUCCESS);
      return response?.data;
    } catch (err) {
      toastrNotification(title, ActionErrorMessages.CREATE, ActionStatuses.ERROR);
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);

export const movieDeleteAsync = createAsyncThunk(
  "movie-management/delete",
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(MOVIE_MANAGEMENT + `/${id}`);
      toastrNotification(title, ActionSuccessMessages.DELETE, ActionStatuses.SUCCESS);
      return response?.data;
    } catch (err) {
      toastrNotification(title, ActionErrorMessages.DELETE, ActionStatuses.ERROR);
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);