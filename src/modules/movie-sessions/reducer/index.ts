import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { MovieSessionsType } from "@/modules/movie-sessions/type/movie-sessions-type";
import { movieWithSessionsGetAsync } from "@/modules/movie-sessions/action";

export interface MovieSessionsState {
  loadingStatus: string;
  errorInfo: {
    message: string;
    error: string;
  };
  movie: MovieSessionsType;
}

const initialState: MovieSessionsState = {
  loadingStatus: LOADING_STATUSES.PENDING,
  errorInfo: {
    message: "",
    error: "",
  },
  movie: null,
};

const movieSessionsSlice = createSlice({
  name: "movie-sessions",
  initialState: initialState,
  reducers: {
    clearErrors(state) {
      state.errorInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(movieWithSessionsGetAsync.pending.type, (state) => {
        state.loadingStatus = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        movieWithSessionsGetAsync.fulfilled.type,
        (state, action: PayloadAction<MovieSessionsType>) => {
          state.loadingStatus = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.movie = action?.payload;
        },
      )
      .addCase(
        movieWithSessionsGetAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatus = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        },
      )
      .addCase(HYDRATE, (state, action: AnyAction) => {
        if (action.payload?.movie_sessions_reducer?.errorInfo) {
          state.loadingStatus = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message:
            action.payload?.movie_sessions_reducer?.errorInfo?.message,
            error: action.payload?.movie_sessions_reducer?.errorInfo?.error,
          };
          state.movie = null;
        } else {
          state.loadingStatus = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.movie = action.payload.movie_sessions_reducer?.movie;
        }
      });
  },
});


export default movieSessionsSlice.reducer;

export const { clearErrors } = movieSessionsSlice.actions;