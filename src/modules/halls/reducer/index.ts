import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { hallsGetAllAsync } from "@/modules/halls/action";
import { HallType } from "@/modules/halls/types/hall-type";

export interface HallState {
  loadingStatus: string;
  errorInfo: {
    message: string;
    error: string;
  };
  halls: HallType[];
}

const initialState: HallState = {
  loadingStatus: LOADING_STATUSES.PENDING,
  errorInfo: {
    message: "",
    error: "",
  },
  halls: [],
};

const hallSlice = createSlice({
  name: "halls",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hallsGetAllAsync.pending.type, (state) => {
        state.loadingStatus = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        hallsGetAllAsync.fulfilled.type,
        (state, action: PayloadAction<HallType[]>) => {
          state.loadingStatus = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.halls = action?.payload;
        },
      )
      .addCase(
        hallsGetAllAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatus = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message ?? null,
            error: action.payload?.error ?? null,
          };
        },
      );
  },
});

export default hallSlice.reducer;
