import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOADING_STATUSES } from "@/shared/constants/redux-constants";
import { AuthorizeResponse } from "@/authorize/types/authorize-response";
import { loginActionAsync, registerActionAsync } from "@/authorize/action";

const initialState = {
  loadingStatus: LOADING_STATUSES.PENDING,
  errorInfo: {
    message: "",
    error: "",
  },
  tokens: {
    access_token: "",
    refresh_token: "",
  },
};

const authorizeSlice = createSlice({
  name: "authorize",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginActionAsync.pending.type,
        (state) => {
          state.loadingStatus = LOADING_STATUSES.LOADING;
          state.errorInfo = null;
          state.tokens = null;
        })
      .addCase(loginActionAsync.fulfilled.type,
        (state, action: PayloadAction<AuthorizeResponse>) => {
          state.loadingStatus = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.tokens = action.payload;
        })
      .addCase(loginActionAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatus = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
          state.tokens = null;
        })

      .addCase(registerActionAsync.pending.type,
        (state) => {
          state.loadingStatus = LOADING_STATUSES.LOADING;
          state.errorInfo = null;
          state.tokens = null;
        })
      .addCase(registerActionAsync.fulfilled.type,
        (state, action: PayloadAction<AuthorizeResponse>) => {
          state.loadingStatus = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.tokens = action.payload;
        })
      .addCase(registerActionAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatus = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
          state.tokens = null;
        });
  },
});

export default authorizeSlice.reducer;