import {
  SessionCreateFieldsType,
  SessionUpdateFieldsType,
} from "@/modules/dashboard/session-management/types/session-field-types";
import { SessionManagementState } from "@/modules/dashboard/session-management/reducer";
import {
  sessionCreateValidationSchemaType,
  sessionUpdateValidationSchemaType,
} from "@/modules/dashboard/session-management/utils/session-validation-schema";

export interface SessionFormProps {
  title: string;
  modalType: string;
  initialValues: SessionCreateFieldsType | SessionUpdateFieldsType;
  handleSubmit: (
    values: SessionCreateFieldsType | SessionUpdateFieldsType,
  ) => void;
  handleCancel: () => void;
  sessionState: SessionManagementState;
  validationSchema:
    | sessionCreateValidationSchemaType
    | sessionUpdateValidationSchemaType;
}
