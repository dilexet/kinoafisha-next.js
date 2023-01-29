import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import Layout from "@/layout/component";
import { LayoutContainerProps } from "@/layout/type/layout-container-props";

const LayoutContainer = ({ children }: LayoutContainerProps) => {
  const [cookie, setCookie] = useCookies();

  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState<boolean | undefined>(undefined);

  const onChangeTheme = (isDark: boolean) => {
    setCookie("DarkMode", isDark, {
      path: "/",
      expires: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)),
    });
    setIsDarkModeEnabled(isDark);
  };

  useEffect(() => {
    if (cookie.DarkMode === undefined) {
      onChangeTheme(true);
    } else {
      onChangeTheme(Boolean(JSON.parse(cookie.DarkMode)));
    }
  }, []);

  return <Layout children={children} isDarkModeEnabled={isDarkModeEnabled} onChangeTheme={onChangeTheme} />;
};

export default LayoutContainer;