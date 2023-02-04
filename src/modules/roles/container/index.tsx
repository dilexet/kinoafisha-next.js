import {
  UserFieldCreateType,
  UserFieldUpdateType,
} from "@/modules/dashboard/user-management/constants/user-field-values";
import { useAppSelector } from "@/modules/shared/redux/hooks";
import RolesComponent from "@/modules/roles/component";
import { SelectChangeEvent } from "@mui/material";

export interface RolesContainerProps {
  values: UserFieldCreateType | UserFieldUpdateType;
  setFieldValue: any;
}

export default function RoleContainer({ values, setFieldValue }: RolesContainerProps) {
  const rolesState = useAppSelector((x) => x.roles_reducer);

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value)
    console.log(setFieldValue)
    setFieldValue("roleId", event.target.value);
  };

  return (
    <RolesComponent values={values} handleChange={handleChange} rolesState={rolesState} />
  );
}