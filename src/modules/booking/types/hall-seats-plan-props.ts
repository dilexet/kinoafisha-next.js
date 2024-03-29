import { SeatType } from "@/modules/booking/types/session-details-type";

export interface HallSeatsPlanProps {
  seat: SeatType;
  numberRow: number;
  handleSelectSeat: (seatId: string) => void;
  handleCancelSelectSeat: (seatId: string) => void;
}
