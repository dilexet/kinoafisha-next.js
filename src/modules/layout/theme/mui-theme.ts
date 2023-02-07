import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#27272A",
      paper: "#27272A",
    },
    text: {
      secondary: "#FFFFFF",
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#D8D8D5",
      paper: "#D8D8D5",
    },
    text: {
      secondary: "#000000",
    },
  },
});
