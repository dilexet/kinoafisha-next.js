import { UserType } from "@/modules/dashboard/user-management/types/user-type";

export interface UserTableBodyProps {
  users: UserType[];
  handleOpenModal: (value: string) => void;
}
