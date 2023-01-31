import { Theme } from "@mui/material";

export type HeaderComponentProps = {
  theme: Theme,
  isDarkModeEnabled: boolean,
  onChangeTheme: (isDark: boolean) => void,
}


export type HeaderContainerProps = {
  isDarkModeEnabled: boolean,
  onChangeTheme: (isDark: boolean) => void,
}