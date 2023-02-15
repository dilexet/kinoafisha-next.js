import { BookingState } from "@/modules/booking/reducer";
import { SeatType } from "@/modules/booking/types/session-details-type";
import { ConfirmBookingState } from "@/modules/confirm-booking/reducer";

export interface ConfirmBookingComponentProps {
  bookingState: BookingState;
  confirmBookingState: ConfirmBookingState;
  handleClose: () => void;
  minutes: number;
  seconds: number;
  isRunning: boolean;
  selectedSeats: SeatType[];
  totalPrice: number;
  handleConfirmOrder: () => void;
}

export interface OrdersListComponentProps {
  selectedSeats: SeatType[];
}

export interface TicketComponentProps {
  selectedSeat: SeatType;
}

export interface TotalPayableInfoComponentProps {
  totalPrice: number;
  handleConfirmOrder: () => void;
  confirmBookingState: ConfirmBookingState;
}
