import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { moviesGetAllAsync } from "@/modules/movies/action";

export interface MovieType {
  id: string;
  name: string;
}

export interface MovieState {
  loadingStatus: string;
  errorInfo: {
    message: string,
    error: string,
  };
  movies: MovieType[];
}

const initialState: MovieState = {
  loadingStatus: LOADING_STATUSES.PENDING,
  errorInfo: {
    message: "",
    error: "",
  },
  movies: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(moviesGetAllAsync.pending.type,
        (state) => {
          state.loadingStatus = LOADING_STATUSES.LOADING;
          state.errorInfo = null;
        })
      .addCase(moviesGetAllAsync.fulfilled.type,
        (state, action: PayloadAction<MovieType[]>) => {
          state.loadingStatus = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.movies = action?.payload;
        })
      .addCase(moviesGetAllAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatus = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        });
  },
});

export default moviesSlice.reducer;