import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile, UserProfileUpdateTypes } from "@/modules/user-profile/types/user-profile-types";
import { userProfileGetActionAsync, userProfileUpdateActionAsync } from "@/modules/user-profile/action";
import { HYDRATE } from "next-redux-wrapper";

export interface UserProfileState {
  loadingStatusGet: string;
  loadingStatusUpdate: string;
  errorInfo: {
    message: string;
    error: string;
  };
  profile: UserProfile;
}

const initialState: UserProfileState = {
  loadingStatusGet: LOADING_STATUSES.PENDING,
  loadingStatusUpdate: LOADING_STATUSES.PENDING,
  errorInfo: {
    message: "",
    error: "",
  },
  profile: null,
};

const userProfileSlice = createSlice({
  name: "user-profile",
  initialState: initialState,
  reducers: {
    clearErrors(state) {
      state.errorInfo = null;
      state.loadingStatusUpdate = LOADING_STATUSES.PENDING;
      state.loadingStatusGet = LOADING_STATUSES.PENDING;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userProfileUpdateActionAsync.pending.type, (state) => {
        state.loadingStatusUpdate = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        userProfileUpdateActionAsync.fulfilled.type,
        (state, action: PayloadAction<UserProfileUpdateTypes>) => {
          state.loadingStatusUpdate = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.profile = {
            ...action.payload,
            orders: state.profile?.orders,
          };
        },
      )
      .addCase(
        userProfileUpdateActionAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusUpdate = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message ?? null,
            error: action.payload?.error ?? null,
          };
        },
      )
      .addCase(userProfileGetActionAsync.pending.type, (state) => {
        state.loadingStatusGet = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        userProfileGetActionAsync.fulfilled.type,
        (state, action: PayloadAction<UserProfile>) => {
          state.loadingStatusGet = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.profile = action?.payload;
        },
      )
      .addCase(
        userProfileGetActionAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusGet = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message ?? null,
            error: action.payload?.error ?? null,
          };
        },
      )
      .addCase(HYDRATE, (state, action: AnyAction) => {
        if (action.payload?.user_profile_reducer?.errorInfo) {
          state.loadingStatusGet = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message:
            action.payload?.user_profile_reducer?.errorInfo?.message,
            error: action.payload?.user_profile_reducer?.errorInfo?.error,
          };
          state.profile = null;
        } else {
          state.loadingStatusGet = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.profile = action.payload.user_profile_reducer.profile;
        }
      });
  },
});


export default userProfileSlice.reducer;

export const { clearErrors } = userProfileSlice.actions;