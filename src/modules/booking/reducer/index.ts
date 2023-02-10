import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { SessionDetailsType } from "@/modules/booking/types/session-details-type";
import { sessionDetailsGetAsync } from "@/modules/booking/action";

export interface SessionDetailsState {
  loadingStatus: string;
  errorInfo: {
    message: string;
    error: string;
  };
  session: SessionDetailsType;
}

const initialState: SessionDetailsState = {
  loadingStatus: LOADING_STATUSES.PENDING,
  errorInfo: {
    message: "",
    error: "",
  },
  session: null,
};

const sessionDetailsSlice = createSlice({
  name: "session-details",
  initialState: initialState,
  reducers: {
    clearErrors(state) {
      state.errorInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sessionDetailsGetAsync.pending.type, (state) => {
        state.loadingStatus = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        sessionDetailsGetAsync.fulfilled.type,
        (state, action: PayloadAction<SessionDetailsType>) => {
          state.loadingStatus = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.session = action?.payload;
        },
      )
      .addCase(
        sessionDetailsGetAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatus = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        },
      )
      .addCase(HYDRATE, (state, action: AnyAction) => {
        if (action.payload?.session_details_reducer?.errorInfo) {
          state.loadingStatus = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message:
            action.payload?.session_details_reducer?.errorInfo?.message,
            error: action.payload?.session_details_reducer?.errorInfo?.error,
          };
          state.session = null;
        } else {
          state.loadingStatus = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.session = action.payload.session_details_reducer?.session;
        }
      });
  },
});


export default sessionDetailsSlice.reducer;

export const { clearErrors } = sessionDetailsSlice.actions;