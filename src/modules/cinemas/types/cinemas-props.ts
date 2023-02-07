import { HallFieldsType } from "@/modules/dashboard/hall-management/types/hall-field-types";
import { SessionFieldsType } from "@/modules/dashboard/session-management/types/session-field-types";
import { SelectChangeEvent } from "@mui/material";
import { CinemaState } from "@/modules/cinemas/reducer";

export interface CinemaContainerProps {
  values: HallFieldsType | SessionFieldsType;
  setFieldValue: any;
  errors: any;
  touched: any;
  handleBlur: any;
}

export interface CinemasComponentProps {
  values: HallFieldsType | SessionFieldsType;
  handleChange: (event: SelectChangeEvent) => void;
  cinemasState: CinemaState;
  errors: any;
  touched: any;
  handleBlur: any;
}
