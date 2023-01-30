import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { LayoutComponentProps } from "@/modules/layout/type/layout-container-props";
import Footer from "@/modules/footer/component";
import HeaderContainer from "@/modules/header/container";
import { darkTheme, lightTheme } from "@/modules/layout/theme/mui-theme";

const Layout = ({ children, isDarkModeEnabled, onChangeTheme }: LayoutComponentProps) => {
  return (
    <ThemeProvider theme={isDarkModeEnabled ? darkTheme : lightTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <CssBaseline>
          <HeaderContainer isDarkModeEnabled={isDarkModeEnabled} onChangeTheme={onChangeTheme} />
          <main>
            {children}
          </main>
          <Footer />
        </CssBaseline>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;