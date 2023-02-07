import { SessionFieldsType } from "@/modules/dashboard/session-management/types/session-field-types";
import { SelectChangeEvent } from "@mui/material";
import { MovieState } from "@/modules/movies/reducer";

export interface MoviesComponentProps {
  values: SessionFieldsType;
  handleChange: (event: SelectChangeEvent) => void;
  moviesState: MovieState;
  errors: any;
  touched: any;
  handleBlur: any;
}

export interface MovieContainerProps {
  values: SessionFieldsType;
  setFieldValue: any;
  touched: any;
  errors: any;
  handleBlur: any;
}
