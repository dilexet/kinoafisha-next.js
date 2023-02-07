import { Theme } from "@mui/material/styles/createTheme";
import { MovieType } from "@/modules/dashboard/movie-management/types/movie-type";

export interface MovieRowContainerProps {
  movie: MovieType;
  index: number;
  handleOpenModal: (modalType: string) => void;
}

export interface MovieRowComponentProps {
  theme: Theme;
  movie: MovieType;
  index: number;
  handleGetDetails: () => void;
  handleUpdate: () => void;
  handleRemove: () => void;
  handleClearErrors: () => void;
}
