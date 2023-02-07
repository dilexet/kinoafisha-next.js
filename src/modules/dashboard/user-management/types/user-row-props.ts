import { Theme } from "@mui/material/styles/createTheme";
import { UserType } from "@/modules/dashboard/user-management/types/user-type";

export interface UserRowContainerProps {
  user: UserType;
  index: number;
  handleOpenModal: (modalType: string) => void;
}

export interface UserRowComponentProps {
  theme: Theme;
  user: UserType;
  index: number;
  handleGetDetails: () => void;
  handleUpdate: () => void;
  handleRemove: () => void;
  handleBlock: () => void;
  handleClearErrors: () => void;
}
