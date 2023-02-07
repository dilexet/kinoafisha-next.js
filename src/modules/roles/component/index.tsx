import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  useTheme,
} from "@mui/material";
import { RolesComponentProps } from "@/modules/roles/types/role-props";

export default function RolesComponent({
  values,
  handleChange,
  rolesState,
}: RolesComponentProps) {
  const theme = useTheme();
  return (
    <FormControl
      variant='outlined'
      margin='normal'
      error={!values?.roleId}
      style={{
        width: "350px",
      }}
    >
      <InputLabel id='demo-simple-select-error-label'>Role</InputLabel>
      <Select
        labelId='demo-simple-select-error-label'
        id='demo-simple-select-error'
        value={values.roleId}
        label='Role'
        onChange={handleChange}
        input={
          <OutlinedInput
            label='Roles'
            style={{
              borderRadius: "20px",
            }}
          />
        }
      >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        {rolesState?.roles?.map((value) => (
          <MenuItem value={value.id} key={value.id}>
            {value.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText
        style={{
          minWidth: "150px",
          minHeight: "20px",
          color: theme.palette.error.main,
        }}
      >
        {!values?.roleId ? "Please select role" : ""}
      </FormHelperText>
    </FormControl>
  );
}
