import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { wrapper } from "@/shared/redux/store";
import LayoutContainer from "@/layout/container";

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <LayoutContainer>
        <Component {...pageProps} />
      </LayoutContainer>
    </Provider>
  );
}
