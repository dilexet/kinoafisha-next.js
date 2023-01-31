import { getCookie, setCookie } from "cookies-next";
import { useCallback, useEffect, useState } from "react";
import Layout from "@/modules/layout/component";
import { LayoutContainerProps } from "@/modules/layout/type/layout-container-props";

const LayoutContainer = ({ children }: LayoutContainerProps) => {
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

  return <Layout children={children} isDarkModeEnabled={isDarkModeEnabled} onChangeTheme={onChangeTheme} />;
};

export default LayoutContainer;