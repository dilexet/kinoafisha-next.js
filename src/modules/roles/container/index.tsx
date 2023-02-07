import { useAppSelector } from "@/modules/shared/redux/hooks";
import RolesComponent from "@/modules/roles/component";
import { SelectChangeEvent } from "@mui/material";
import { RolesContainerProps } from "@/modules/roles/types/role-props";

export default function RoleContainer({ values, setFieldValue }: RolesContainerProps) {
  const rolesState = useAppSelector((x) => x.roles_reducer);

  const handleChange = (event: SelectChangeEvent) => {
    setFieldValue("roleId", event.target.value);
  };

  return (
    <RolesComponent values={values} handleChange={handleChange} rolesState={rolesState} />
  );
}