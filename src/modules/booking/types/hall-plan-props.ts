import { HallType } from "@/modules/booking/types/session-details-type";

export interface HallPlanProps {
  hall: HallType;
  handleSelectSeat: (seatId: string) => void;
  handleCancelSelectSeat: (seatId: string) => void;
}
