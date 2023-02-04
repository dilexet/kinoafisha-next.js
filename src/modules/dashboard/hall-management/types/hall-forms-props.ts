import { HallFieldsType } from "@/modules/dashboard/hall-management/types/hall-field-types";
import { HallManagementState } from "@/modules/dashboard/hall-management/reducer";

export interface HallFormsProps {
  title: string;
  initialValues: HallFieldsType;
  handleSubmit: (values: HallFieldsType) => void;
  handleCancel: () => void;
  hallState: HallManagementState;
}