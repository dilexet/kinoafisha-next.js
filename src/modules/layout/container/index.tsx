import { getCookie, setCookie } from "cookies-next";
import { useCallback, useEffect, useState } from "react";
import Layout from "@/modules/layout/component";
import { LayoutContainerProps } from "@/modules/layout/type/layout-container-props";
import Loading from "@/modules/loading";
import {
  themeCookieAge,
  themeCookieKey,
} from "@/modules/layout/constants/theme-cookie";

const LayoutContainer = ({ Component, pageProps }: LayoutContainerProps) => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState<
    boolean | undefined
  >(undefined);

  const onChangeTheme = useCallback((isDark: boolean) => {
    setCookie(themeCookieKey, isDark, {
      path: "/",
      maxAge: themeCookieAge,
    });
    setIsDarkModeEnabled(isDark);
  }, []);

  useEffect(() => {
    const cookie = getCookie(themeCookieKey);
    if (cookie === undefined) {
      onChangeTheme(true);
    } else {
      onChangeTheme(Boolean(JSON.parse(cookie.toString())));
    }
  }, [onChangeTheme]);
  if (isDarkModeEnabled === undefined) {
    return <Loading />;
  }
  return (
    <Layout
      Component={Component}
      pageProps={pageProps}
      isDarkModeEnabled={isDarkModeEnabled}
      onChangeTheme={onChangeTheme}
    />
  );
};

export default LayoutContainer;
