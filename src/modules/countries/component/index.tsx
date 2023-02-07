import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/system";

export default function CountriesComponent({
  selectedCountries,
  handleChange,
  inputValue,
  handleInputChange,
  countries,
  handleOnSubmit,
  values,
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Autocomplete
        multiple={true}
        value={selectedCountries}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        id='controllable-states-demo'
        options={countries}
        sx={{ width: 300 }}
        style={{
          width: "350px",
          borderRadius: "20px",
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            error={values?.countries.length <= 0}
            helperText={
              values?.countries?.length <= 0 ? "Please select countries" : ""
            }
            onKeyDown={handleOnSubmit}
            label='Countries'
            InputProps={{
              ...params.InputProps,
              style: { borderRadius: "20px" },
            }}
          />
        )}
      />
    </Box>
  );
}
