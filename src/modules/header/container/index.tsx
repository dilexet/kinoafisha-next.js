import React from "react";
import { useTheme } from "@mui/material";
import Header from "@/modules/header/component";

const HeaderContainer = () => {
  const theme = useTheme();

  return (
    <Header
      theme={theme}
    />
  );
};

export default HeaderContainer;
