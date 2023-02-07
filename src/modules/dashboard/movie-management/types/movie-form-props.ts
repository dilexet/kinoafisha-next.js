import { GridTextFieldsType } from "@/modules/dashboard/shared/types/grid-items-type";
import { MovieFieldType } from "@/modules/dashboard/movie-management/constants/movie-field-values";
import { MovieManagementState } from "@/modules/dashboard/movie-management/reducer";

export interface MovieFormProps {
  title: string;
  initialValues: MovieFieldType;
  textFields: GridTextFieldsType[];
  handleSubmit: (values: MovieFieldType) => void;
  handleCancel: () => void;
  movieState: MovieManagementState;
}
