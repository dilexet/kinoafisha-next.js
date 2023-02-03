import { AnyAction, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { RootState } from "@/modules/shared/redux/store";
import { HYDRATE } from "next-redux-wrapper";
import { ManagementState } from "@/modules/shared/types/management-state";
import { MovieType } from "@/modules/dashboard/movie-management/types/movie-type";
import {
  movieCreateAsync, movieDeleteAsync,
  movieGetAllActionAsync,
  movieGetOneActionAsync,
  movieUpdateAsync,
} from "@/modules/dashboard/movie-management/action";

export interface MovieManagementState extends ManagementState {
  movie: MovieType | null;
}

const initialState: MovieManagementState = {
  loadingStatusGetAll: LOADING_STATUSES.PENDING,
  loadingStatusGetOne: LOADING_STATUSES.PENDING,
  loadingStatusUpdate: LOADING_STATUSES.PENDING,
  loadingStatusCreate: LOADING_STATUSES.PENDING,
  loadingStatusDelete: LOADING_STATUSES.PENDING,
  errorInfo: {
    message: "",
    error: "",
  },
  movie: null,
};

export const movieEntityAdapter = createEntityAdapter<MovieType>({
    selectId: model => model?.id,
  },
);

const initialAdapterState = movieEntityAdapter.getInitialState(initialState);

const movieManagementSlice = createSlice({
  name: "movie-management",
  initialState: initialAdapterState,
  reducers: {
    clearErrors(state) {
      state.errorInfo = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(movieGetAllActionAsync.pending.type,
        (state) => {
          state.loadingStatusGetAll = LOADING_STATUSES.LOADING;
          state.errorInfo = null;
        })
      .addCase(movieGetAllActionAsync.fulfilled.type,
        (state, action: PayloadAction<MovieType[]>) => {
          state.loadingStatusGetAll = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          movieEntityAdapter.setAll(state, action.payload);
        })
      .addCase(movieGetAllActionAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusGetAll = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        })

      .addCase(movieGetOneActionAsync.pending.type,
        (state) => {
          state.loadingStatusGetOne = LOADING_STATUSES.LOADING;
          state.errorInfo = null;
        })
      .addCase(movieGetOneActionAsync.fulfilled.type,
        (state, action: PayloadAction<MovieType>) => {
          state.loadingStatusGetOne = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.movie = action.payload;
        })
      .addCase(movieGetOneActionAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusGetOne = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        })

      .addCase(movieUpdateAsync.pending.type,
        (state) => {
          state.loadingStatusUpdate = LOADING_STATUSES.LOADING;
          state.errorInfo = null;
        })
      .addCase(movieUpdateAsync.fulfilled.type,
        (state, action: PayloadAction<MovieType>) => {
          state.loadingStatusUpdate = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          movieEntityAdapter.updateOne(state, { id: action?.payload?.id, changes: action?.payload });
        })
      .addCase(movieUpdateAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusUpdate = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        })

      .addCase(movieCreateAsync.pending.type,
        (state) => {
          state.loadingStatusCreate = LOADING_STATUSES.LOADING;
          state.errorInfo = null;
        })
      .addCase(movieCreateAsync.fulfilled.type,
        (state, action: PayloadAction<MovieType>) => {
          state.loadingStatusCreate = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          movieEntityAdapter.addOne(state, action?.payload);
        })
      .addCase(movieCreateAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusCreate = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        })

      .addCase(movieDeleteAsync.pending.type,
        (state) => {
          state.loadingStatusDelete = LOADING_STATUSES.LOADING;
          state.errorInfo = null;
        })
      .addCase(movieDeleteAsync.fulfilled.type,
        (state, action: PayloadAction<string>) => {
          state.loadingStatusDelete = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          movieEntityAdapter.removeOne(state, action?.payload);
        })
      .addCase(movieDeleteAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusDelete = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        })

      .addCase(HYDRATE, (state, action: AnyAction) => {
        if (action.payload?.movie_management_reducer?.errorInfo) {
          state.loadingStatusGetAll = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.movie_management_reducer?.errorInfo?.message,
            error: action.payload?.movie_management_reducer?.errorInfo?.error,
          };
          movieEntityAdapter.setAll(state, []);
        } else {
          state.loadingStatusGetAll = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          movieEntityAdapter.setAll(state, action.payload.movie_management_reducer?.entities);
        }
      });
  },
});

export default movieManagementSlice.reducer;

const movieManagementSelectors = movieEntityAdapter.getSelectors<RootState>(
  state => state.movie_management_reducer);

export const { clearErrors } = movieManagementSlice.actions;

export const {
  selectAll,
} = movieManagementSelectors;