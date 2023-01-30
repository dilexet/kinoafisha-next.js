import React from "react";
import { RegisterFieldValues } from "@/authorize/constants/register-field-values";
import { AuthorizeState } from "@/authorize/reducer";

export type RegisterComponentProps = {
  authorizeState: AuthorizeState,
  rememberMe: boolean,
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>,
  handleSubmitForm: (values: typeof RegisterFieldValues) => void,
  handleNavigateToSignIn: () => void,
  handleGoogleAuthorize: () => void,
}