import { GridItemsType } from "@/modules/dashboard/shared/types/grid-items-type";
import { SessionManagementState } from "@/modules/dashboard/session-management/reducer";

export interface SessionDetailsProps {
  gridItems: GridItemsType[];
  sessionState: SessionManagementState;
  handleRemoveFromBooking: (id: string) => void;
}
