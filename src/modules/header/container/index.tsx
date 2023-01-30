import React from "react";
import { useTheme } from "@mui/material";
import Header from "@/modules/header/component";
import { HeaderContainerProps } from "@/modules/header/type/header-component-props";

const HeaderContainer = ({ isDarkModeEnabled, onChangeTheme }: HeaderContainerProps) => {
  const theme = useTheme();

  return (
    <Header isDarkModeEnabled={isDarkModeEnabled} onChangeTheme={onChangeTheme} theme={theme} />
  );
};

export default HeaderContainer;