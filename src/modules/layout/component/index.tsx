import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { LayoutComponentProps } from "@/modules/layout/type/layout-container-props";
import Footer from "@/modules/footer/component";
import HeaderContainer from "@/modules/header/container";
import { darkTheme, lightTheme } from "@/modules/layout/theme/mui-theme";
import { googleOptions } from "@/modules/shared/constants/google-constants";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MainLayout from "@/modules/layout/component/main-layout";

const Layout = ({ Component, pageProps, isDarkModeEnabled, onChangeTheme }: LayoutComponentProps) => {
  return (
    <GoogleOAuthProvider clientId={googleOptions.GOOGLE_ID}>
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
            <section>
              <MainLayout Component={Component} pageProps={pageProps}/>
            </section>
            <Footer />
          </CssBaseline>
        </Box>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};



export default Layout;