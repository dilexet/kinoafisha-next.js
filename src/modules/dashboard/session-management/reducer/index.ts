import { AnyAction, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { RootState } from "@/modules/shared/redux/store";
import { HYDRATE } from "next-redux-wrapper";
import { ManagementState } from "@/modules/shared/types/management-state";
import {
  SessionDetailsType,
  SessionSeatType,
  SessionType,
} from "@/modules/dashboard/session-management/types/session-type";
import {
  sessionCreateAsync, sessionDeleteAsync,
  sessionGetAllActionAsync,
  sessionGetOneActionAsync, sessionSeatRemoveFromBookingAsync,
  sessionUpdateAsync,
} from "@/modules/dashboard/session-management/action";

export interface SessionManagementState extends ManagementState {
  loadingStatusRemoveFromBooking: string;
  session: SessionDetailsType | null;
}

const initialState: SessionManagementState = {
  loadingStatusGetAll: LOADING_STATUSES.PENDING,
  loadingStatusGetOne: LOADING_STATUSES.PENDING,
  loadingStatusUpdate: LOADING_STATUSES.PENDING,
  loadingStatusCreate: LOADING_STATUSES.PENDING,
  loadingStatusDelete: LOADING_STATUSES.PENDING,
  loadingStatusRemoveFromBooking: LOADING_STATUSES.PENDING,
  errorInfo: {
    message: "",
    error: "",
  },
  session: null,
};

export const sessionEntityAdapter = createEntityAdapter<SessionType>({
    selectId: model => model?.id,
  },
);

const initialAdapterState = sessionEntityAdapter.getInitialState(initialState);

const sessionManagementSlice = createSlice({
  name: "session-management",
  initialState: initialAdapterState,
  reducers: {
    clearErrors(state) {
      state.errorInfo = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(sessionGetAllActionAsync.pending.type,
        (state) => {
          state.loadingStatusGetAll = LOADING_STATUSES.LOADING;
          state.errorInfo = null;
        })
      .addCase(sessionGetAllActionAsync.fulfilled.type,
        (state, action: PayloadAction<SessionType[]>) => {
          state.loadingStatusGetAll = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          sessionEntityAdapter.setAll(state, action.payload);
        })
      .addCase(sessionGetAllActionAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusGetAll = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        })

      .addCase(sessionGetOneActionAsync.pending.type,
        (state) => {
          state.loadingStatusGetOne = LOADING_STATUSES.LOADING;
          state.errorInfo = null;
        })
      .addCase(sessionGetOneActionAsync.fulfilled.type,
        (state, action: PayloadAction<SessionDetailsType>) => {
          state.loadingStatusGetOne = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.session = action.payload;
        })
      .addCase(sessionGetOneActionAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusGetOne = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        })

      .addCase(sessionUpdateAsync.pending.type,
        (state) => {
          state.loadingStatusUpdate = LOADING_STATUSES.LOADING;
          state.errorInfo = null;
        })
      .addCase(sessionUpdateAsync.fulfilled.type,
        (state, action: PayloadAction<SessionType>) => {
          state.loadingStatusUpdate = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          sessionEntityAdapter.updateOne(state, { id: action?.payload?.id, changes: action?.payload });
        })
      .addCase(sessionUpdateAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusUpdate = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        })

      .addCase(sessionCreateAsync.pending.type,
        (state) => {
          state.loadingStatusCreate = LOADING_STATUSES.LOADING;
          state.errorInfo = null;
        })
      .addCase(sessionCreateAsync.fulfilled.type,
        (state, action: PayloadAction<SessionType[]>) => {
          state.loadingStatusCreate = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          sessionEntityAdapter.addMany(state, action?.payload);
        })
      .addCase(sessionCreateAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusCreate = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        })

      .addCase(sessionDeleteAsync.pending.type,
        (state) => {
          state.loadingStatusDelete = LOADING_STATUSES.LOADING;
          state.errorInfo = null;
        })
      .addCase(sessionDeleteAsync.fulfilled.type,
        (state, action: PayloadAction<string>) => {
          state.loadingStatusDelete = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          sessionEntityAdapter.removeOne(state, action?.payload);
        })
      .addCase(sessionDeleteAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusDelete = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        })

      .addCase(sessionSeatRemoveFromBookingAsync.pending.type,
        (state) => {
          state.loadingStatusUpdate = LOADING_STATUSES.LOADING;
          state.errorInfo = null;
        })
      .addCase(sessionSeatRemoveFromBookingAsync.fulfilled.type,
        (state, action: PayloadAction<SessionSeatType>) => {
          state.loadingStatusUpdate = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.session.sessionSeats = state?.session?.sessionSeats?.map(x =>
            x?.id !== action?.payload?.id ? x : action?.payload,
          );
        })
      .addCase(sessionSeatRemoveFromBookingAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusUpdate = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        })

      .addCase(HYDRATE, (state, action: AnyAction) => {
        if (action.payload?.session_management_reducer?.errorInfo) {
          state.loadingStatusGetAll = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.session_management_reducer?.errorInfo?.message,
            error: action.payload?.session_management_reducer?.errorInfo?.error,
          };
          sessionEntityAdapter.setAll(state, []);
        } else {
          state.loadingStatusGetAll = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          sessionEntityAdapter.setAll(state, action.payload.session_management_reducer?.entities);
        }
      });
  },
});

export default sessionManagementSlice.reducer;

const sessionManagementSelectors = sessionEntityAdapter.getSelectors<RootState>(
  state => state.session_management_reducer);

export const { clearErrors } = sessionManagementSlice.actions;

export const {
  selectAll,
} = sessionManagementSelectors;