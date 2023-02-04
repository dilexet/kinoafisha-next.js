import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import {
  UserFieldCreateType,
  UserFieldUpdateType,
} from "@/modules/dashboard/user-management/constants/user-field-values";
import { RolesState } from "@/modules/roles/reducer";

export interface RolesComponentProps {
  values: UserFieldCreateType | UserFieldUpdateType;
  handleChange: (event: SelectChangeEvent) => void;
  rolesState: RolesState;
}

export default function RolesComponent({ values, handleChange, rolesState }: RolesComponentProps) {
  const theme = useTheme();
  console.log(values)
  return (
    <FormControl
      variant="outlined"
      margin="normal"
      error={!values?.roleId}
      style={{
        width: "350px",
      }}>
      <InputLabel id="demo-simple-select-error-label">Role</InputLabel>
      <Select
        labelId="demo-simple-select-error-label"
        id="demo-simple-select-error"
        value={values.roleId}
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
          rolesState?.roles?.map((value) => (
            <MenuItem value={value.id} key={value.id}>{value.name}</MenuItem>
          ))
        }
      </Select>
      <FormHelperText
        style={{ minWidth: "150px", minHeight: "20px", color: theme.palette.error.main }}>
        {!values?.roleId ? "Please select role" : ""}
      </FormHelperText>
    </FormControl>
  );
}