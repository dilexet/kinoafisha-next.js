import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cinemasGetAllAsync } from "@/modules/cinemas/action";
import { CinemaType } from "@/modules/cinemas/types/cinema-type";

export interface CinemaState {
  loadingStatus: string;
  errorInfo: {
    message: string,
    error: string,
  };
  cinemas: CinemaType[];
}

const initialState: CinemaState = {
  loadingStatus: LOADING_STATUSES.PENDING,
  errorInfo: {
    message: "",
    error: "",
  },
  cinemas: [],
};

const cinemasSlice = createSlice({
  name: "cinemas",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(cinemasGetAllAsync.pending.type,
        (state) => {
          state.loadingStatus = LOADING_STATUSES.LOADING;
          state.errorInfo = null;
        })
      .addCase(cinemasGetAllAsync.fulfilled.type,
        (state, action: PayloadAction<CinemaType[]>) => {
          state.loadingStatus = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.cinemas = action?.payload;
        })
      .addCase(cinemasGetAllAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatus = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        });
  },
});

export default cinemasSlice.reducer;