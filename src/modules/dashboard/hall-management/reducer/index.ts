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
import {
  HallDetailsType,
  HallType,
} from "@/modules/dashboard/hall-management/types/hall-type";
import {
  hallCreateAsync,
  hallDeleteAsync,
  hallGetAllActionAsync,
  hallGetOneActionAsync,
  hallUpdateAsync,
} from "@/modules/dashboard/hall-management/action";

export interface HallManagementState extends ManagementState {
  hall: HallDetailsType | null;
}

const initialState: HallManagementState = {
  loadingStatusGetAll: LOADING_STATUSES.PENDING,
  loadingStatusGetOne: LOADING_STATUSES.PENDING,
  loadingStatusUpdate: LOADING_STATUSES.PENDING,
  loadingStatusCreate: LOADING_STATUSES.PENDING,
  loadingStatusDelete: LOADING_STATUSES.PENDING,
  errorInfo: {
    message: "",
    error: "",
  },
  hall: null,
};

export const hallManagementAdapter = createEntityAdapter<HallType>({
  selectId: (model) => model?.id,
});

const initialAdapterState = hallManagementAdapter.getInitialState(initialState);

const hallManagementSlice = createSlice({
  name: "hall-management",
  initialState: initialAdapterState,
  reducers: {
    clearErrors(state) {
      state.errorInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hallGetAllActionAsync.pending.type, (state) => {
        state.loadingStatusGetAll = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        hallGetAllActionAsync.fulfilled.type,
        (state, action: PayloadAction<HallType[]>) => {
          state.loadingStatusGetAll = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          hallManagementAdapter.setAll(state, action.payload);
        },
      )
      .addCase(
        hallGetAllActionAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusGetAll = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        },
      )

      .addCase(hallGetOneActionAsync.pending.type, (state) => {
        state.loadingStatusGetOne = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        hallGetOneActionAsync.fulfilled.type,
        (state, action: PayloadAction<HallDetailsType>) => {
          state.loadingStatusGetOne = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.hall = action.payload;
        },
      )
      .addCase(
        hallGetOneActionAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusGetOne = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        },
      )

      .addCase(hallUpdateAsync.pending.type, (state) => {
        state.loadingStatusUpdate = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        hallUpdateAsync.fulfilled.type,
        (state, action: PayloadAction<HallType>) => {
          state.loadingStatusUpdate = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          hallManagementAdapter.updateOne(state, {
            id: action?.payload?.id,
            changes: action?.payload,
          });
        },
      )
      .addCase(
        hallUpdateAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusUpdate = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        },
      )

      .addCase(hallCreateAsync.pending.type, (state) => {
        state.loadingStatusCreate = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        hallCreateAsync.fulfilled.type,
        (state, action: PayloadAction<HallType>) => {
          state.loadingStatusCreate = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          hallManagementAdapter.addOne(state, action?.payload);
        },
      )
      .addCase(
        hallCreateAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusCreate = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        },
      )

      .addCase(hallDeleteAsync.pending.type, (state) => {
        state.loadingStatusDelete = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        hallDeleteAsync.fulfilled.type,
        (state, action: PayloadAction<string>) => {
          state.loadingStatusDelete = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          hallManagementAdapter.removeOne(state, action?.payload);
        },
      )
      .addCase(
        hallDeleteAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusDelete = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        },
      )

      .addCase(HYDRATE, (state, action: AnyAction) => {
        if (action.payload?.hall_management_reducer?.errorInfo) {
          state.loadingStatusGetAll = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message:
              action.payload?.hall_management_reducer?.errorInfo?.message,
            error: action.payload?.hall_management_reducer?.errorInfo?.error,
          };
          hallManagementAdapter.setAll(state, []);
        } else {
          state.loadingStatusGetAll = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          hallManagementAdapter.setAll(
            state,
            action.payload.hall_management_reducer?.entities,
          );
        }
      });
  },
});

export default hallManagementSlice.reducer;

const hallManagementSelectors = hallManagementAdapter.getSelectors<RootState>(
  (state) => state.hall_management_reducer,
);

export const { clearErrors } = hallManagementSlice.actions;

export const { selectAll } = hallManagementSelectors;
