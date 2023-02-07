import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { countriesGetAllAsync } from "@/modules/countries/action";
import { CountryType } from "@/modules/countries/types/country-type";

export interface CountryState {
  loadingStatus: string;
  errorInfo: {
    message: string,
    error: string,
  };
  countries: CountryType[];
}

const initialState: CountryState = {
  loadingStatus: LOADING_STATUSES.PENDING,
  errorInfo: {
    message: "",
    error: "",
  },
  countries: [],
};

const countriesSlice = createSlice({
  name: "countries",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(countriesGetAllAsync.pending.type,
        (state) => {
          state.loadingStatus = LOADING_STATUSES.LOADING;
          state.errorInfo = null;
        })
      .addCase(countriesGetAllAsync.fulfilled.type,
        (state, action: PayloadAction<CountryType[]>) => {
          state.loadingStatus = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.countries = action?.payload;
        })
      .addCase(countriesGetAllAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatus = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message,
            error: action.payload?.error,
          };
        });
  },
});

export default countriesSlice.reducer;