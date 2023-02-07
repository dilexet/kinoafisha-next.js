import React from "react";
import { RegisterFieldValues } from "@/modules/authorize/constants/register-field-values";
import { AuthorizeState } from "@/modules/authorize/reducer";

export interface RegisterComponentProps {
  authorizeState: AuthorizeState,
  rememberMe: boolean,
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>,
  handleSubmitForm: (values: typeof RegisterFieldValues) => void,
  handleNavigateToSignIn: () => void,
}