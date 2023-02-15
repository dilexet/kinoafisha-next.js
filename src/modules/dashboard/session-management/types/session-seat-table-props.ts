import { SessionDetailsType } from "@/modules/dashboard/session-management/types/session-type";

export interface SessionSeatTableProps {
  session: SessionDetailsType;
  handleRemoveFromBooking: (id: string) => void;
}
