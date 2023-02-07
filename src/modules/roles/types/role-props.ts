import {
  UserFieldCreateType,
  UserFieldUpdateType,
} from "@/modules/dashboard/user-management/constants/user-field-values";
import { SelectChangeEvent } from "@mui/material";
import { RolesState } from "@/modules/roles/reducer";

export interface RolesContainerProps {
  values: UserFieldCreateType | UserFieldUpdateType;
  setFieldValue: any;
}

export interface RolesComponentProps {
  values: UserFieldCreateType | UserFieldUpdateType;
  handleChange: (event: SelectChangeEvent) => void;
  rolesState: RolesState;
}
