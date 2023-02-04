import { getCookie, setCookie } from "cookies-next";
import { useCallback, useEffect, useState } from "react";
import Layout from "@/modules/layout/component";
import { LayoutContainerProps } from "@/modules/layout/type/layout-container-props";
import Loading from "@/modules/shared/component/loading";

const LayoutContainer = ({ Component, pageProps }: LayoutContainerProps) => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState<boolean | undefined>(undefined);

  const onChangeTheme = useCallback((isDark: boolean) => {
    setCookie("DarkMode", isDark, {
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    setIsDarkModeEnabled(isDark);
  }, []);

  // TODO: move key to constants
  useEffect(() => {
    const cookie = getCookie("DarkMode");
    if (cookie === undefined) {
      onChangeTheme(true);
    } else {
      onChangeTheme(Boolean(JSON.parse(cookie.toString())));
    }
  }, [onChangeTheme]);
  if (isDarkModeEnabled === undefined) {
    return (
      <Loading />
    );
  }
  return <Layout Component={Component} pageProps={pageProps} isDarkModeEnabled={isDarkModeEnabled}
                 onChangeTheme={onChangeTheme} />;
};

export default LayoutContainer;