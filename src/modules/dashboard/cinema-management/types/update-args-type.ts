import { CinemaFieldType } from "@/modules/dashboard/cinema-management/constants/cinema-field-values";

export interface UpdateArgsType {
  values: CinemaFieldType;
  id: string;
}