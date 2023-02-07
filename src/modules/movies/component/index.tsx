import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent, useTheme,
} from "@mui/material";
import { MovieState } from "@/modules/movies/reducer";
import { SessionFieldsType } from "@/modules/dashboard/session-management/types/session-field-types";

export interface MoviesComponentProps {
  values: SessionFieldsType;
  handleChange: (event: SelectChangeEvent) => void;
  moviesState: MovieState;
  errors: any;
  touched: any;
  handleBlur: any;
}

export default function MoviesComponent({
                                          values,
                                          handleChange,
                                          moviesState,
                                          handleBlur,
                                          errors, touched,
                                        }: MoviesComponentProps) {
  const theme = useTheme();
  return (
    <FormControl
      variant="outlined"
      margin="normal"
      error={errors?.movieId && touched?.movieId}
      style={{
        width: "350px",
      }}>
      <InputLabel id="demo-simple-select-error-label">Movies</InputLabel>
      <Select
        labelId="demo-simple-select-error-label"
        id="movieId"
        name="movieId"
        value={values?.movieId}
        label="Movies"
        onChange={handleChange}
        onBlur={handleBlur}
        input={<OutlinedInput label="Movies" style={{
          borderRadius: "20px",
        }} />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {
          moviesState?.movies?.map((value) => (
            <MenuItem value={value.id} key={value.id}>{value.name}</MenuItem>
          ))
        }
      </Select>
      <FormHelperText
        style={{ minWidth: "150px", minHeight: "20px", color: theme.palette.error.main }}>
        {errors?.movieId && touched?.movieId ? errors?.movieId : ""}
      </FormHelperText>
    </FormControl>
  );
}