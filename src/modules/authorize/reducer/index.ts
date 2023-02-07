import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { AuthorizeResponse } from "@/modules/authorize/types/authorize-response";
import {
  googleAuthorizeAsync,
  loginActionAsync,
  logoutActionAsync,
  refreshTokensAsync,
  registerActionAsync,
} from "@/modules/authorize/action";

export type AuthorizeState = typeof initialState;

const initialState = {
  loadingStatus: LOADING_STATUSES.PENDING,
  errorInfo: {
    message: "",
    error: "",
  },
  tokens: {
    accessToken: "",
    refreshToken: "",
  },
};

const authorizeSlice = createSlice({
  name: "authorize",
  initialState: initialState,
  reducers: {
    clearErrors(state) {
      state.errorInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginActionAsync.pending.type, (state) => {
        state.loadingStatus = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
        state.tokens = null;
      })
      .addCase(
        loginActionAsync.fulfilled.type,
        (state, action: PayloadAction<AuthorizeResponse>) => {
          state.loadingStatus = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.tokens = action.payload;
        },
      )
      .addCase(
        loginActionAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatus = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
          state.tokens = null;
        },
      )

      .addCase(registerActionAsync.pending.type, (state) => {
        state.loadingStatus = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
        state.tokens = null;
      })
      .addCase(
        registerActionAsync.fulfilled.type,
        (state, action: PayloadAction<AuthorizeResponse>) => {
          state.loadingStatus = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.tokens = action.payload;
        },
      )
      .addCase(
        registerActionAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatus = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
          state.tokens = null;
        },
      )

      .addCase(logoutActionAsync.pending.type, (state) => {
        state.loadingStatus = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
        state.tokens = null;
      })
      .addCase(logoutActionAsync.fulfilled.type, (state) => {
        state.loadingStatus = LOADING_STATUSES.IDLE;
        state.errorInfo = null;
        state.tokens = null;
      })
      .addCase(
        logoutActionAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatus = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
          state.tokens = null;
        },
      )

      .addCase(refreshTokensAsync.pending.type, (state) => {
        state.loadingStatus = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
        state.tokens = null;
      })
      .addCase(
        refreshTokensAsync.fulfilled.type,
        (state, action: PayloadAction<AuthorizeResponse>) => {
          state.loadingStatus = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.tokens = action.payload;
        },
      )
      .addCase(
        refreshTokensAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatus = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
          state.tokens = null;
        },
      )

      .addCase(googleAuthorizeAsync.pending.type, (state) => {
        state.loadingStatus = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
        state.tokens = null;
      })
      .addCase(
        googleAuthorizeAsync.fulfilled.type,
        (state, action: PayloadAction<AuthorizeResponse>) => {
          state.loadingStatus = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.tokens = action.payload;
        },
      )
      .addCase(
        googleAuthorizeAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatus = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
          state.tokens = null;
        },
      );
  },
});

export default authorizeSlice.reducer;

export const { clearErrors } = authorizeSlice.actions;
