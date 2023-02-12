import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { AuthorizeResponse } from "@/modules/authorize/types/authorize-response";
import {
  googleAuthorizeAsync,
  loginActionAsync,
  logoutActionAsync,
  refreshTokensActionAsync,
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
      state.loadingStatus = LOADING_STATUSES.PENDING;
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
            message: action.payload?.message ?? null,
            error: action.payload?.error ?? null,
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
            message: action.payload?.message ?? null,
            error: action.payload?.error ?? null,
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
            message: action.payload?.message ?? null,
            error: action.payload?.error ?? null,
          };
          state.tokens = null;
        },
      )

      .addCase(refreshTokensActionAsync.pending.type, (state) => {
        state.loadingStatus = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
        state.tokens = null;
      })
      .addCase(
        refreshTokensActionAsync.fulfilled.type,
        (state, action: PayloadAction<AuthorizeResponse>) => {
          state.loadingStatus = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.tokens = action.payload;
        },
      )
      .addCase(
        refreshTokensActionAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatus = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message ?? null,
            error: action.payload?.error ?? null,
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
            message: action.payload?.message ?? null,
            error: action.payload?.error ?? null,
          };
          state.tokens = null;
        },
      );
  },
});

export default authorizeSlice.reducer;

export const { clearErrors } = authorizeSlice.actions;
