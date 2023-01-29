import React from "react";
import { useTheme } from "@mui/material";
import Header from "@/header/component";
import { HeaderContainerProps } from "@/header/type/header-component-props";

const HeaderContainer = ({ isDarkModeEnabled, onChangeTheme }: HeaderContainerProps) => {
  const theme = useTheme();

  return (
    <Header isDarkModeEnabled={isDarkModeEnabled} onChangeTheme={onChangeTheme} theme={theme} />
  );
};

export default HeaderContainer;