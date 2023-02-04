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

export interface CinemasComponentProps {
  values: HallFieldsType;
  handleChange: (event: SelectChangeEvent) => void;
  cinemasState: CinemaState;
}

export default function CinemasComponent({ values, handleChange, cinemasState }: CinemasComponentProps) {
  const theme = useTheme();
  console.log(cinemasState.cinemas)
  return (
    <FormControl
      variant="outlined"
      margin="normal"
      error={!values?.cinemaId}
      style={{
        width: "350px",
      }}>
      <InputLabel id="demo-simple-select-error-label">Cinema</InputLabel>
      <Select
        labelId="demo-simple-select-error-label"
        id="demo-simple-select-error"
        value={values?.cinemaId}
        label="Role"
        onChange={handleChange}
        input={<OutlinedInput label="Roles" style={{
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
        {!values?.cinemaId ? "Please select cinema" : ""}
      </FormHelperText>
    </FormControl>
  );
}