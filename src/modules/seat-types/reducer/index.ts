import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { seatTypesGetAllAsync } from "@/modules/seat-types/action";
import { generateColor } from "@/modules/shared/utils/generate-color";

export interface SeatTypeTypeRequest {
  id: string;
  name: string;
}

export interface SeatTypeType extends SeatTypeTypeRequest {
  color: string;
}

export interface SeatTypeState {
  loadingStatus: string;
  errorInfo: {
    message: string,
    error: string,
  };
  seatTypes: SeatTypeType[];
}

const initialState: SeatTypeState = {
  loadingStatus: LOADING_STATUSES.PENDING,
  errorInfo: {
    message: "",
    error: "",
  },
  seatTypes: [],
};

const seatTypesSlice = createSlice({
  name: "seat-types",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(seatTypesGetAllAsync.pending.type,
        (state) => {
          state.loadingStatus = LOADING_STATUSES.LOADING;
          state.errorInfo = null;
        })
      .addCase(seatTypesGetAllAsync.fulfilled.type,
        (state, action: PayloadAction<SeatTypeTypeRequest[]>) => {
          state.loadingStatus = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.seatTypes = action.payload?.map((value) => {
            const seatType: SeatTypeType = {
              id: value?.id,
              name: value?.name,
              color: generateColor(value?.id),
            };
            return seatType;
          });
        })
      .addCase(seatTypesGetAllAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatus = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        });
  },
});

export default seatTypesSlice.reducer;