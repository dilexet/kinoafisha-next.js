import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { genresGetAllAsync } from "@/modules/genres/action";

export interface GenresType {
  id: string;
  name: string;
}

export interface GenresState {
  loadingStatus: string;
  errorInfo: {
    message: string,
    error: string,
  };
  genres: GenresType[];
}

const initialState: GenresState = {
  loadingStatus: LOADING_STATUSES.PENDING,
  errorInfo: {
    message: "",
    error: "",
  },
  genres: [],
};

const genresSlice = createSlice({
  name: "genres",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(genresGetAllAsync.pending.type,
        (state) => {
          state.loadingStatus = LOADING_STATUSES.LOADING;
          state.errorInfo = null;
        })
      .addCase(genresGetAllAsync.fulfilled.type,
        (state, action: PayloadAction<GenresType[]>) => {
          state.loadingStatus = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.genres = action?.payload;
        })
      .addCase(genresGetAllAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatus = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        });
  },
});

export default genresSlice.reducer;