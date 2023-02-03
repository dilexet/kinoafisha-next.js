import { GridItemsType } from "@/modules/dashboard/shared/types/grid-items-type";
import { CinemaManagementState } from "@/modules/dashboard/cinema-management/reducer";

export interface CinemaDetailsProps {
  gridItems: GridItemsType[];
  cinemaState: CinemaManagementState;
}