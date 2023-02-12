import { BookingState } from "@/modules/booking/reducer";
import { SeatType, SessionDetailsType, SessionSeatType } from "@/modules/booking/types/session-details-type";

export interface SessionDetailsComponentProps {
  bookingState: BookingState;
  handleClose: () => void;
  handleSelectSeat: (seatId: string) => void;
  handleCancelSelectSeat: (seatId: string) => void;
  selectedSeatIds: string[];
  minutes: number;
  seconds: number;
  isRunning: boolean;
}

export interface SessionMovieInfoComponentProps {
  session: SessionDetailsType;
}

export interface SeatTypeInfoComponentProps {
  sessionSeatTypes: SessionSeatType[];
  hallName: string;
}

export interface SeatTypeComponentProps {
  seatType: SessionSeatType;
}

export interface SelectedSeatsComponentProps {
  selectedSeats: SeatType[];
  session: SessionDetailsType;
  totalPrice: number;
  handleCancelSelectSeat: (seatId: string) => void;
  handleConfirmOrder: () => void;
  openLoginModal: boolean;
  openRegisterModal: boolean;
  setOpenLoginModal: any;
  setOpenRegisterModal: any;
}


export interface SelectedSeatComponentProps {
  selectedSeat: SeatType;
  handleCancelSelectSeat: (seatId: string) => void;
}