import { GridTextFieldsType } from "@/modules/dashboard/shared/types/grid-items-type";
import { Theme } from "@mui/material/styles/createTheme";
import { MovieFieldType } from "@/modules/dashboard/movie-management/constants/movie-field-values";
import { MovieManagementState } from "@/modules/dashboard/movie-management/reducer";
import { ImageUploadState } from "@/modules/upload-image/reducer";

export interface MovieFormProps {
  theme: Theme,
  title: string;
  initialValues: MovieFieldType;
  textFields: GridTextFieldsType[];
  handleSubmit: (values: MovieFieldType) => void;
  handleCancel: () => void;
  movieState: MovieManagementState;
  imageState: ImageUploadState;
}