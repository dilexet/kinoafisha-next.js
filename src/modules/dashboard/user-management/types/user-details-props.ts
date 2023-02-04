import { GridItemsType } from "@/modules/dashboard/shared/types/grid-items-type";
import { UserManagementState } from "@/modules/dashboard/user-management/reducer";

export interface UserDetailsProps {
  gridItems: GridItemsType[];
  userState: UserManagementState;
}