import {
  Box,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  useTheme,
} from "@mui/material";
import getStyles from "@/modules/genres/utils/get-styles";
import { MenuProps } from "@/modules/genres/constants/menu-props";

export default function GenresComponent({ values, handleChange, genresState, selectedGenres }) {
  const theme = useTheme();
  return (
    <FormControl
      variant="outlined"
      margin="normal"
      error={values?.genres.length <= 0}
      style={{
        width: "350px",
      }}>
      <InputLabel id="demo-multiple-chip-label">Genres</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={selectedGenres}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Genres" style={{
          borderRadius: "20px",
        }} />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {
              selected.map((value) => (
                <Chip key={value.id} label={value.name} />
              ))
            }
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {
          genresState?.genres?.map((value) => (
            <MenuItem key={value.id} value={value}
                      style={getStyles(value.id, values.genres, theme)}
            >
              {value.name}
            </MenuItem>
          ))
        }
      </Select>
      <FormHelperText
        style={{ minWidth: "150px", minHeight: "20px", color: theme.palette.error.main }}>
        {values?.genres.length <= 0 ? "Please select genres" : ""}
      </FormHelperText>
    </FormControl>
  );
}