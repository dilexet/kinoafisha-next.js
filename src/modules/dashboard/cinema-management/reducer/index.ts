import {
  AnyAction,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import {
  cinemaCreateAsync,
  cinemaDeleteAsync,
  cinemaGetAllActionAsync,
  cinemaGetOneActionAsync,
  cinemaUpdateAsync,
} from "@/modules/dashboard/cinema-management/action";
import { CinemaType } from "@/modules/dashboard/cinema-management/types/cinema-type";
import { RootState } from "@/modules/shared/redux/store";
import { HYDRATE } from "next-redux-wrapper";
import { ManagementState } from "@/modules/shared/types/management-state";

export interface CinemaManagementState extends ManagementState {
  cinema: CinemaType | null;
}

const initialState: CinemaManagementState = {
  loadingStatusGetAll: LOADING_STATUSES.PENDING,
  loadingStatusGetOne: LOADING_STATUSES.PENDING,
  loadingStatusUpdate: LOADING_STATUSES.PENDING,
  loadingStatusCreate: LOADING_STATUSES.PENDING,
  loadingStatusDelete: LOADING_STATUSES.PENDING,
  errorInfo: {
    message: "",
    error: "",
  },
  cinema: null,
};

export const cinemaManagementAdapter = createEntityAdapter<CinemaType>({
  selectId: (model) => model?.id,
});

const initialAdapterState =
  cinemaManagementAdapter.getInitialState(initialState);

const cinemaManagementSlice = createSlice({
  name: "cinema-management",
  initialState: initialAdapterState,
  reducers: {
    clearErrors(state) {
      state.errorInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(cinemaGetAllActionAsync.pending.type, (state) => {
        state.loadingStatusGetAll = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        cinemaGetAllActionAsync.fulfilled.type,
        (state, action: PayloadAction<CinemaType[]>) => {
          state.loadingStatusGetAll = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          cinemaManagementAdapter.setAll(state, action.payload);
        },
      )
      .addCase(
        cinemaGetAllActionAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusGetAll = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        },
      )

      .addCase(cinemaGetOneActionAsync.pending.type, (state) => {
        state.loadingStatusGetOne = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        cinemaGetOneActionAsync.fulfilled.type,
        (state, action: PayloadAction<CinemaType>) => {
          state.loadingStatusGetOne = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.cinema = action.payload;
        },
      )
      .addCase(
        cinemaGetOneActionAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusGetOne = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        },
      )

      .addCase(cinemaUpdateAsync.pending.type, (state) => {
        state.loadingStatusUpdate = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        cinemaUpdateAsync.fulfilled.type,
        (state, action: PayloadAction<CinemaType>) => {
          state.loadingStatusUpdate = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          cinemaManagementAdapter.updateOne(state, {
            id: action?.payload?.id,
            changes: action?.payload,
          });
        },
      )
      .addCase(
        cinemaUpdateAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusUpdate = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        },
      )

      .addCase(cinemaCreateAsync.pending.type, (state) => {
        state.loadingStatusCreate = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        cinemaCreateAsync.fulfilled.type,
        (state, action: PayloadAction<CinemaType>) => {
          state.loadingStatusCreate = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          cinemaManagementAdapter.addOne(state, action?.payload);
        },
      )
      .addCase(
        cinemaCreateAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusCreate = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        },
      )

      .addCase(cinemaDeleteAsync.pending.type, (state) => {
        state.loadingStatusDelete = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        cinemaDeleteAsync.fulfilled.type,
        (state, action: PayloadAction<string>) => {
          state.loadingStatusDelete = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          cinemaManagementAdapter.removeOne(state, action?.payload);
        },
      )
      .addCase(
        cinemaDeleteAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusDelete = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        },
      )

      .addCase(HYDRATE, (state, action: AnyAction) => {
        if (action.payload?.cinema_management_reducer?.errorInfo) {
          state.loadingStatusGetAll = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message:
              action.payload?.cinema_management_reducer?.errorInfo?.message,
            error: action.payload?.cinema_management_reducer?.errorInfo?.error,
          };
          cinemaManagementAdapter.setAll(state, []);
        } else {
          state.loadingStatusGetAll = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          cinemaManagementAdapter.setAll(
            state,
            action.payload.cinema_management_reducer?.entities,
          );
        }
      });
  },
});

export default cinemaManagementSlice.reducer;

const cinemaManagementSelectors =
  cinemaManagementAdapter.getSelectors<RootState>(
    (state) => state.cinema_management_reducer,
  );

export const { clearErrors } = cinemaManagementSlice.actions;

export const { selectAll } = cinemaManagementSelectors;
