import { SessionFieldsType } from "@/modules/dashboard/session-management/types/session-field-types";
import { SelectChangeEvent } from "@mui/material";
import { HallState } from "@/modules/halls/reducer";

export interface HallsComponentProps {
  values: SessionFieldsType;
  handleChange: (event: SelectChangeEvent) => void;
  hallsState: HallState;
  touched: any;
  errors: any;
  handleBlur: any;
}

export interface HallContainerProps {
  values: SessionFieldsType;
  setFieldValue: any;
  touched: any;
  errors: any;
  handleBlur: any;
}
