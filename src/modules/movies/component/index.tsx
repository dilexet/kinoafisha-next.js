import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  useTheme,
} from "@mui/material";
import { MoviesComponentProps } from "@/modules/movies/types/movie-props";


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