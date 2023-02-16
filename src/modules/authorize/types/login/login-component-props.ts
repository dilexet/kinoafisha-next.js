import React from "react";
import { LoginFieldValues } from "@/modules/authorize/constants/login-field-values";
import { AuthorizeState } from "@/modules/authorize/reducer";

export interface LoginComponentProps {
  authorizeState: AuthorizeState;
  rememberMe: boolean;
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmitForm: (values: typeof LoginFieldValues) => void;
  handleNavigateToSignUp: () => void;
  setIsSubmit: any;
}
