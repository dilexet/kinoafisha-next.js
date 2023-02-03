import { MovieFieldType } from "@/modules/dashboard/movie-management/constants/movie-field-values";

export interface UpdateArgsType {
  values: MovieFieldType;
  id: string;
}