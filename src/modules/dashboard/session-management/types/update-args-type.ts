import { SessionUpdateFieldsType } from "@/modules/dashboard/session-management/types/session-field-types";

export interface UpdateArgsType {
  values: SessionUpdateFieldsType;
  id: string;
}
