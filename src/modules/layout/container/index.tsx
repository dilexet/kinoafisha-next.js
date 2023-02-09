import Layout from "@/modules/layout/component";
import { LayoutContainerProps } from "@/modules/layout/type/layout-container-props";

const LayoutContainer = ({ Component, pageProps }: LayoutContainerProps) => {
   return (
    <Layout
      Component={Component}
      pageProps={pageProps}
    />
  );
};

export default LayoutContainer;
