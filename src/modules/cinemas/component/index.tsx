import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent, useTheme,
} from "@mui/material";
import { CinemaState } from "@/modules/cinemas/reducer";
import { HallFieldsType } from "@/modules/dashboard/hall-management/types/hall-field-types";
import { SessionFieldsType } from "@/modules/dashboard/session-management/types/session-field-types";

export interface CinemasComponentProps {
  values: HallFieldsType | SessionFieldsType;
  handleChange: (event: SelectChangeEvent) => void;
  cinemasState: CinemaState;
  errors: any;
  touched: any;
  handleBlur: any;
}

export default function CinemasComponent({
                                           values, handleChange, cinemasState,
                                           errors, touched, handleBlur,
                                         }: CinemasComponentProps) {
  const theme = useTheme();
  return (
    <FormControl
      variant="outlined"
      margin="normal"
      error={errors?.cinemaId && touched?.cinemaId}
      style={{
        width: "350px",
      }}>
      <InputLabel id="demo-simple-select-error-label">Cinema</InputLabel>
      <Select
        labelId="demo-simple-select-error-label"
        id="cinemaId"
        name="cinemaId"
        value={values?.cinemaId}
        label="Cinema"
        onChange={handleChange}
        onBlur={handleBlur}
        input={<OutlinedInput label="Cinemas" style={{
          borderRadius: "20px",
        }} />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {
          cinemasState?.cinemas?.map((value) => (
            <MenuItem value={value.id} key={value.id}>{value.name}</MenuItem>
          ))
        }
      </Select>
      <FormHelperText
        style={{ minWidth: "150px", minHeight: "20px", color: theme.palette.error.main }}>
        {errors?.cinemaId && touched?.cinemaId ? errors?.cinemaId : ""}
      </FormHelperText>
    </FormControl>
  );
}