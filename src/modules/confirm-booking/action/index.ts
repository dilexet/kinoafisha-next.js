import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/modules/shared/utils/axios-creater";
import { BOOKING } from "@/modules/shared/constants/api-constants";
import { ConfirmBookingArgs } from "@/modules/confirm-booking/types/confirm-booking-args";
import { toastr } from "react-redux-toastr";

export const confirmBookingActionAsync = createAsyncThunk(
  "booking/confirm",
  async (args: ConfirmBookingArgs, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`${BOOKING}/${args.sessionId}`, args);
      toastr.success("Confirm booking", "Confirm booking completed successfully");
      return response?.data;
    } catch (err) {
      toastr.error("Confirm booking", "Confirm booking completed with error");
      return thunkAPI.rejectWithValue(err.response.data.errorInfo);
    }
  },
);