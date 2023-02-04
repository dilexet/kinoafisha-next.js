import { GridItemsType } from "@/modules/dashboard/shared/types/grid-items-type";
import { HallManagementState } from "@/modules/dashboard/hall-management/reducer";

export interface HallDetailsProps {
  gridItems: GridItemsType[];
  hallState: HallManagementState;
}