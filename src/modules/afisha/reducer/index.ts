import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { AnyAction, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "@/modules/shared/redux/store";
import { MovieType } from "../types/movie-type";
import { moviesAfishaGetAllAsync, moviesAfishaUploadAsync } from "@/modules/afisha/action";

export interface MovieAfishaState {
  loadingStatusGetAll: string;
  loadingStatusUpload: string;
  errorInfo: {
    message: string;
    error: string;
  };
  isFull: boolean;
}

const initialState: MovieAfishaState = {
  loadingStatusGetAll: LOADING_STATUSES.PENDING,
  loadingStatusUpload: LOADING_STATUSES.PENDING,
  errorInfo: {
    message: "",
    error: "",
  },
  isFull: false,
};

export const movieAfishaEntityAdapter = createEntityAdapter<MovieType>({
  selectId: model => model?.id,
});

const initialAdapterState = movieAfishaEntityAdapter.getInitialState(initialState);


const movieAfishaSlice = createSlice({
  name: "movie-afisha",
  initialState: initialAdapterState,
  reducers: {
    clearErrors(state) {
      state.errorInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(moviesAfishaGetAllAsync.pending.type, (state) => {
        state.loadingStatusGetAll = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        moviesAfishaGetAllAsync.fulfilled.type,
        (state, action: PayloadAction<MovieType[]>) => {
          state.loadingStatusGetAll = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.isFull = action?.payload?.length <= 0;
          movieAfishaEntityAdapter.setAll(state, action.payload);
        },
      )
      .addCase(
        moviesAfishaGetAllAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusGetAll = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        },
      )
      .addCase(moviesAfishaUploadAsync.pending.type, (state) => {
        state.loadingStatusUpload = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        moviesAfishaUploadAsync.fulfilled.type,
        (state, action: PayloadAction<MovieType[]>) => {
          state.loadingStatusUpload = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.isFull = action?.payload?.length <= 0;
          movieAfishaEntityAdapter.addMany(state, action.payload);
        },
      )
      .addCase(
        moviesAfishaUploadAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatusUpload = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        },
      )
      .addCase(HYDRATE, (state, action: AnyAction) => {
        if (action.payload?.movie_afisha_reducer?.errorInfo) {
          state.loadingStatusGetAll = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message:
            action.payload?.movie_afisha_reducer?.errorInfo?.message,
            error: action.payload?.movie_afisha_reducer?.errorInfo?.error,
          };
          movieAfishaEntityAdapter.setAll(state, []);
        } else {
          state.loadingStatusGetAll = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          movieAfishaEntityAdapter.setAll(
            state,
            action.payload.movie_afisha_reducer?.entities,
          );
        }
      });
  },
});


export default movieAfishaSlice.reducer;

const movieAfishaSelectors = movieAfishaEntityAdapter.getSelectors<RootState>(
  (state) => state.movie_afisha_reducer,
);

export const { clearErrors } = movieAfishaSlice.actions;

export const { selectAll } = movieAfishaSelectors;