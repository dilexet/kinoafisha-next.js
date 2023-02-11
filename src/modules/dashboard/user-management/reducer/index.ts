import {
  AnyAction,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { RootState } from "@/modules/shared/redux/store";
import { HYDRATE } from "next-redux-wrapper";
import { ManagementState } from "@/modules/shared/types/management-state";
import { UserType } from "@/modules/dashboard/user-management/types/user-type";
import {
  userGetAllActionAsync,
  userGetOneActionAsync,
  userCreateAsync,
  userUpdateAsync,
  userDeleteAsync,
  userChangeBlockStatusAsync,
} from "@/modules/dashboard/user-management/action";

export interface UserManagementState extends ManagementState {
  loadingStatusChangeLockStatus: string;
  user: UserType | null;
}

const initialState: UserManagementState = {
  loadingStatusGetAll: LOADING_STATUSES.PENDING,
  loadingStatusGetOne: LOADING_STATUSES.PENDING,
  loadingStatusUpdate: LOADING_STATUSES.PENDING,
  loadingStatusCreate: LOADING_STATUSES.PENDING,
  loadingStatusDelete: LOADING_STATUSES.PENDING,
  loadingStatusChangeLockStatus: LOADING_STATUSES.PENDING,
  errorInfo: {
    message: "",
    error: "",
  },
  user: null,
};

export const userEntityAdapter = createEntityAdapter<UserType>({
  selectId: (model) => model?.id,
});

const initialAdapterState = userEntityAdapter.getInitialState(initialState);

const userManagementSlice = createSlice({
  name: "user-management",
  initialState: initialAdapterState,
  reducers: {
    clearErrors(state) {
      state.errorInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userGetAllActionAsync.pending.type, (state) => {
        state.loadingStatusGetAll = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        userGetAllActionAsync.fulfilled.type,
        (state, action: PayloadAction<UserType[]>) => {
          state.loadingStatusGetAll = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          userEntityAdapter.setAll(state, action.payload);
        },
      )
      .addCase(
        userGetAllActionAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusGetAll = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message ?? null,
            error: action.payload?.error ?? null,
          };
        },
      )

      .addCase(userGetOneActionAsync.pending.type, (state) => {
        state.loadingStatusGetOne = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        userGetOneActionAsync.fulfilled.type,
        (state, action: PayloadAction<UserType>) => {
          state.loadingStatusGetOne = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.user = action.payload;
        },
      )
      .addCase(
        userGetOneActionAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusGetOne = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message ?? null,
            error: action.payload?.error ?? null,
          };
        },
      )

      .addCase(userUpdateAsync.pending.type, (state) => {
        state.loadingStatusUpdate = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        userUpdateAsync.fulfilled.type,
        (state, action: PayloadAction<UserType>) => {
          state.loadingStatusUpdate = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          userEntityAdapter.updateOne(state, {
            id: action?.payload?.id,
            changes: action?.payload,
          });
        },
      )
      .addCase(
        userUpdateAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusUpdate = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message ?? null,
            error: action.payload?.error ?? null,
          };
        },
      )

      .addCase(userChangeBlockStatusAsync.pending.type, (state) => {
        state.loadingStatusUpdate = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        userChangeBlockStatusAsync.fulfilled.type,
        (state, action: PayloadAction<UserType>) => {
          state.loadingStatusUpdate = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          userEntityAdapter.updateOne(state, {
            id: action?.payload?.id,
            changes: action?.payload,
          });
        },
      )
      .addCase(
        userChangeBlockStatusAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusUpdate = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message ?? null,
            error: action.payload?.error ?? null,
          };
        },
      )

      .addCase(userCreateAsync.pending.type, (state) => {
        state.loadingStatusCreate = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        userCreateAsync.fulfilled.type,
        (state, action: PayloadAction<UserType>) => {
          state.loadingStatusCreate = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          userEntityAdapter.addOne(state, action?.payload);
        },
      )
      .addCase(
        userCreateAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusCreate = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message ?? null,
            error: action.payload?.error ?? null,
          };
        },
      )

      .addCase(userDeleteAsync.pending.type, (state) => {
        state.loadingStatusDelete = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        userDeleteAsync.fulfilled.type,
        (state, action: PayloadAction<string>) => {
          state.loadingStatusDelete = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          userEntityAdapter.removeOne(state, action?.payload);
        },
      )
      .addCase(
        userDeleteAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusDelete = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message ?? null,
            error: action.payload?.error ?? null,
          };
        },
      )

      .addCase(HYDRATE, (state, action: AnyAction) => {
        if (action.payload?.user_management_reducer?.errorInfo) {
          state.loadingStatusGetAll = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message:
              action.payload?.user_management_reducer?.errorInfo?.message,
            error: action.payload?.user_management_reducer?.errorInfo?.error,
          };
          userEntityAdapter.setAll(state, []);
        } else {
          state.loadingStatusGetAll = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          userEntityAdapter.setAll(
            state,
            action.payload.user_management_reducer?.entities,
          );
        }
      });
  },
});

export default userManagementSlice.reducer;

const userManagementSelectors = userEntityAdapter.getSelectors<RootState>(
  (state) => state.user_management_reducer,
);

export const { clearErrors } = userManagementSlice.actions;

export const { selectAll } = userManagementSelectors;
