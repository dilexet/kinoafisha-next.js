import {
  UserFieldCreateType,
  UserFieldUpdateType,
} from "@/modules/dashboard/user-management/constants/user-field-values";
import { GridTextFieldsType } from "@/modules/dashboard/shared/types/grid-items-type";
import { UserManagementState } from "@/modules/dashboard/user-management/reducer";
import {
  userCreateValidationSchemaType,
  userUpdateValidationSchemaType,
} from "@/modules/dashboard/user-management/utils/user-validation-schema";

export interface UserFormProps {
  title: string;
  initialValues: UserFieldCreateType | UserFieldUpdateType;
  textFields: GridTextFieldsType[];
  handleSubmit: (values: UserFieldCreateType | UserFieldUpdateType) => void;
  handleCancel: () => void;
  userState: UserManagementState;
  validationSchema: userCreateValidationSchemaType | userUpdateValidationSchemaType;
}