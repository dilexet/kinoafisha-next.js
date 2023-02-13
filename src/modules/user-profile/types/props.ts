import { UserProfileState } from "@/modules/user-profile/reducer";
import { BookedOrder, BookedSeat } from "@/modules/user-profile/types/user-profile-types";
import { UserProfileUpdateArgs } from "@/modules/user-profile/types/user-profile-update-args";

export interface UserProfileComponentProps {
  tabsValue: string;
  handleChange: (event: any, value: string) => void;
  profileState: UserProfileState;
}

export interface OrdersListComponentProps {
  orders: BookedOrder[];
}

export interface OrderCardProps {
  order: BookedOrder;
}

export interface CollapsibleReservedSeatsComponentProps {
  open: boolean;
  reservedSeats: BookedSeat[];
}

export interface ProfileComponentProps {
  profileState: UserProfileState;
  handleSubmit: (values: UserProfileUpdateArgs) => void;
  initialValues: UserProfileUpdateArgs;
}