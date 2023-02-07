import { CinemaFieldType } from "@/modules/dashboard/cinema-management/constants/cinema-field-values";
import { GridTextFieldsType } from "@/modules/dashboard/shared/types/grid-items-type";
import { CinemaManagementState } from "@/modules/dashboard/cinema-management/reducer";

export interface CinemaFormProps {
  title: string;
  initialValues: CinemaFieldType;
  initializeTextField: GridTextFieldsType[];
  handleSubmit: (values: CinemaFieldType) => void;
  handleCancel: () => void;
  cinemaState: CinemaManagementState;
}
