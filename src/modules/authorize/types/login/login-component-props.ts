import React from "react";
import { LoginFieldValues } from "@/modules/authorize/constants/login-field-values";
import { AuthorizeState } from "@/modules/authorize/reducer";

export type LoginComponentProps = {
  authorizeState: AuthorizeState,
  rememberMe: boolean,
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>,
  handleSubmitForm: (values: typeof LoginFieldValues) => void,
  handleGoogleAuthorize: () => void,
  handleNavigateToSignUp: () => void,
}