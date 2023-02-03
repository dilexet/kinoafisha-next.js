import { UserFieldUpdateType } from "@/modules/dashboard/user-management/constants/user-field-values";

export interface UpdateArgsType {
  values: UserFieldUpdateType;
  id: string;
}