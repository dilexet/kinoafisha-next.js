import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConfirmBookingResponse } from "@/modules/confirm-booking/types/confirm-booking-response";
import { confirmBookingActionAsync } from "@/modules/confirm-booking/action";

export interface ConfirmBookingState {
  loadingStatus: string;
  errorInfo: {
    message: string;
    error: string;
  };
  order: ConfirmBookingResponse;
}

const initialState: ConfirmBookingState = {
  loadingStatus: LOADING_STATUSES.PENDING,
  errorInfo: {
    message: "",
    error: "",
  },
  order: null,
};

const confirmBookingSlice = createSlice({
  name: "confirm-booking",
  initialState: initialState,
  reducers: {
    clearErrors(state) {
      state.errorInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(confirmBookingActionAsync.pending.type, (state) => {
        state.loadingStatus = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        confirmBookingActionAsync.fulfilled.type,
        (state, action: PayloadAction<ConfirmBookingResponse>) => {
          state.loadingStatus = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.order = action?.payload;
        },
      )
      .addCase(
        confirmBookingActionAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatus = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message ?? null,
            error: action.payload?.error ?? null,
          };
        },
      );
  },
});

export default confirmBookingSlice.reducer;

export const { clearErrors } = confirmBookingSlice.actions;
