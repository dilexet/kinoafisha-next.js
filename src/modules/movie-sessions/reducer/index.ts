import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { MovieSessionsType } from "@/modules/movie-sessions/type/movie-sessions-type";
import { movieWithSessionsGetAsync } from "@/modules/movie-sessions/action";
import {
  CommentArrayType,
  CommentInfoType,
  CommentType,
} from "@/modules/movie-sessions/type/comment-types";

export interface MovieSessionsState {
  loadingStatus: string;
  errorInfo: {
    message: string;
    error: string;
  };
  movie: MovieSessionsType;
  comments: CommentInfoType[];
}

const initialState: MovieSessionsState = {
  loadingStatus: LOADING_STATUSES.PENDING,
  errorInfo: {
    message: "",
    error: "",
  },
  movie: null,
  comments: null,
};

const movieSessionsSlice = createSlice({
  name: "movie-sessions",
  initialState: initialState,
  reducers: {
    clearErrors(state) {
      state.errorInfo = null;
    },
    addComment(state, action: PayloadAction<CommentType>) {
      state.comments = [action.payload?.comment, ...state.comments];
    },
    getComments(state, action: PayloadAction<CommentArrayType>) {
      state.comments = action.payload?.comments;
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
            message: action.payload?.message ?? null,
            error: action.payload?.error ?? null,
          };
        },
      )
      .addCase(HYDRATE, (state, action: AnyAction) => {
        if (action.payload?.movie_sessions_reducer?.errorInfo) {
          state.loadingStatus = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.movie_sessions_reducer?.errorInfo?.message,
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

export const { clearErrors, addComment, getComments } =
  movieSessionsSlice.actions;
