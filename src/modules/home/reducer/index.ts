import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { MovieType } from "@/modules/home/types/movie-type";
import { AnyAction, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { moviesFilterGetAllAsync } from "@/modules/home/action";
import { RootState } from "@/modules/shared/redux/store";

export interface MovieFilterState {
  loadingStatusGetAll: string;
  errorInfo: {
    message: string;
    error: string;
  };
}

const initialState: MovieFilterState = {
  loadingStatusGetAll: LOADING_STATUSES.PENDING,
  errorInfo: {
    message: "",
    error: "",
  },
};

export const movieFilterEntityAdapter = createEntityAdapter<MovieType>({
  selectId: model => model?.id,
});

const initialAdapterState = movieFilterEntityAdapter.getInitialState(initialState);


const movieFilterSlice = createSlice({
  name: "movie-filter",
  initialState: initialAdapterState,
  reducers: {
    clearErrors(state) {
      state.errorInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(moviesFilterGetAllAsync.pending.type, (state) => {
        state.loadingStatusGetAll = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        moviesFilterGetAllAsync.fulfilled.type,
        (state, action: PayloadAction<MovieType[]>) => {
          state.loadingStatusGetAll = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          movieFilterEntityAdapter.setAll(state, action.payload);
        },
      )
      .addCase(
        moviesFilterGetAllAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusGetAll = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        },
      )
      .addCase(HYDRATE, (state, action: AnyAction) => {
        if (action.payload?.movie_filter_reducer?.errorInfo) {
          state.loadingStatusGetAll = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message:
            action.payload?.movie_filter_reducer?.errorInfo?.message,
            error: action.payload?.movie_filter_reducer?.errorInfo?.error,
          };
          movieFilterEntityAdapter.setAll(state, []);
        } else {
          state.loadingStatusGetAll = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          movieFilterEntityAdapter.setAll(
            state,
            action.payload.movie_filter_reducer?.entities,
          );
        }
      });
  },
});


export default movieFilterSlice.reducer;

const movieFilterSelectors = movieFilterEntityAdapter.getSelectors<RootState>(
  (state) => state.movie_filter_reducer,
);

export const { clearErrors } = movieFilterSlice.actions;

export const { selectAll } = movieFilterSelectors;