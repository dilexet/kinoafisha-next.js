import { ReactNode } from "react";

export type LayoutComponentProps = {
  children: ReactNode;
  isDarkModeEnabled: boolean,
  onChangeTheme: (isDark: boolean) => void,
}

export type LayoutContainerProps = {
  children: ReactNode;
}