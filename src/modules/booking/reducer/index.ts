import { LOADING_STATUSES } from "@/modules/shared/constants/redux-constants";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { SessionDetailsType } from "@/modules/booking/types/session-details-type";
import { sessionDetailsGetAsync } from "@/modules/booking/action";
import { generateColor } from "@/modules/shared/utils/generate-color";
import { TicketState } from "@/modules/shared/constants/ticket-state";

export interface BookingState {
  loadingStatus: string;
  errorInfo: {
    message: string;
    error: string;
  };
  session: SessionDetailsType;
}

const initialState: BookingState = {
  loadingStatus: LOADING_STATUSES.PENDING,
  errorInfo: {
    message: "",
    error: "",
  },
  session: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState: initialState,
  reducers: {
    clearErrors(state) {
      state.errorInfo = null;
    },
    blockSeat(state, action: PayloadAction<string>) {
      state.session = {
        ...state.session,
        hall: {
          ...state.session?.hall,
          rows: state.session?.hall?.rows?.map((row) => ({
            ...row,
            seats: row.seats?.map((seat) =>
              seat?.sessionSeatId !== action?.payload
                ? seat
                : {
                    ...seat,
                    ticketState: TicketState.BlockedMySelf,
                  },
            ),
          })),
        },
      };
    },

    unlockSeat(state, action: PayloadAction<string>) {
      state.session = {
        ...state.session,
        hall: {
          ...state.session?.hall,
          rows: state.session?.hall?.rows?.map((row) => ({
            ...row,
            seats: row.seats?.map((seat) =>
              seat?.sessionSeatId !== action?.payload
                ? seat
                : {
                    ...seat,
                    ticketState: TicketState.Free,
                  },
            ),
          })),
        },
      };
    },

    receiveBlockSeat(state, action: PayloadAction<string>) {
      state.session = {
        ...state.session,
        hall: {
          ...state.session?.hall,
          rows: state.session?.hall?.rows?.map((row) => ({
            ...row,
            seats: row.seats?.map((seat) =>
              seat?.sessionSeatId !== action?.payload
                ? seat
                : {
                    ...seat,
                    ticketState: TicketState.Blocked,
                  },
            ),
          })),
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sessionDetailsGetAsync.pending.type, (state) => {
        state.loadingStatus = LOADING_STATUSES.LOADING;
        state.errorInfo = null;
      })
      .addCase(
        sessionDetailsGetAsync.fulfilled.type,
        (state, action: PayloadAction<SessionDetailsType>) => {
          state.loadingStatus = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.session = {
            ...action?.payload,
            sessionSeatTypes: action?.payload?.sessionSeatTypes?.map(
              (seatType) => ({
                ...seatType,
                colorHex: generateColor(seatType?.id),
              }),
            ),
            hall: {
              ...action?.payload?.hall,
              rows: action?.payload?.hall?.rows?.map((row) => ({
                ...row,
                seats: row.seats?.map((seat) => ({
                  ...seat,
                  colorHex: generateColor(seat.seatTypeId),
                  numberRow: row.numberRow,
                })),
              })),
            },
          };
        },
      )
      .addCase(
        sessionDetailsGetAsync.rejected.type,
        (state, action: PayloadAction<any>) => {
          state.loadingStatus = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.message ?? null,
            error: action.payload?.error ?? null,
          };
        },
      )
      .addCase(HYDRATE, (state, action: AnyAction) => {
        if (action.payload?.booking_reducer?.errorInfo) {
          state.loadingStatus = LOADING_STATUSES.FAILED;
          state.errorInfo = {
            message: action.payload?.booking_reducer?.errorInfo?.message,
            error: action.payload?.booking_reducer?.errorInfo?.error,
          };
          state.session = null;
        } else {
          state.loadingStatus = LOADING_STATUSES.IDLE;
          state.errorInfo = null;
          state.session = action.payload.booking_reducer?.session;
        }
      });
  },
});

export default bookingSlice.reducer;

export const { clearErrors, blockSeat, receiveBlockSeat, unlockSeat } =
  bookingSlice.actions;
