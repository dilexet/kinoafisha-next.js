import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent, useTheme,
} from "@mui/material";
import { SessionFieldsType } from "@/modules/dashboard/session-management/types/session-field-types";
import { HallState } from "@/modules/halls/reducer";

export interface HallsComponentProps {
  values: SessionFieldsType;
  handleChange: (event: SelectChangeEvent) => void;
  hallsState: HallState;
  touched: any;
  errors: any;
  handleBlur: any;
}

export default function HallsComponent({
                                         values,
                                         handleChange,
                                         hallsState,
                                         errors,
                                         handleBlur,
                                         touched,
                                       }: HallsComponentProps) {
  const theme = useTheme();
  return (
    <FormControl
      variant="outlined"
      margin="normal"
      disabled={values?.cinemaId === ""}
      error={errors?.hallId && touched?.hallId}
      style={{
        width: "350px",
      }}>
      <InputLabel id="demo-simple-select-error-label">Halls</InputLabel>
      <Select
        labelId="demo-simple-select-error-label"
        id="hallId"
        name="hallId"
        value={values?.hallId}
        label="Halls"
        onChange={handleChange}
        onBlur={handleBlur}
        input={<OutlinedInput label="Halls" style={{
          borderRadius: "20px",
        }} />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {
          hallsState?.halls?.map((value) => (
            <MenuItem value={value.id} key={value.id}>{value.name}</MenuItem>
          ))
        }
      </Select>
      <FormHelperText
        style={{ minWidth: "150px", minHeight: "20px", color: theme.palette.error.main }}>
        {errors?.hallId && touched?.hallId ? errors?.hallId : ""}
      </FormHelperText>
    </FormControl>
  );
}