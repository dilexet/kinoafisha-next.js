import { CinemaType } from "@/modules/dashboard/cinema-management/types/cinema-type";
import { Theme } from "@mui/material/styles/createTheme";

export interface CinemaRowContainerProps {
  cinema: CinemaType;
  index: number;
  handleOpenModal: (modalType: string) => void;
}

export interface CinemaRowComponentProps {
  theme: Theme;
  cinema: CinemaType;
  index: number;
  handleGetDetails: () => void;
  handleUpdate: () => void;
  handleRemove: () => void;
  handleClearErrors: () => void;
}