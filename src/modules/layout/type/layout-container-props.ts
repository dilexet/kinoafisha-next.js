import { NextComponentType, NextPageContext } from "next/dist/shared/lib/utils";

export type LayoutComponentProps = {
  Component: NextComponentType<NextPageContext, any, any>;
  pageProps: any;
  isDarkModeEnabled: boolean;
  onChangeTheme: (isDark: boolean) => void;
};

export type LayoutContainerProps = {
  Component: NextComponentType<NextPageContext, any, any>;
  pageProps: any;
};
