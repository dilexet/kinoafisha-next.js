import { RowType } from "@/modules/booking/types/session-details-type";

export interface HallRowsPlanProps {
  row: RowType;
  handleSelectSeat: (seatId: string) => void;
  handleCancelSelectSeat: (seatId: string) => void;
}
