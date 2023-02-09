import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import { wrapper } from "@/modules/shared/redux/store";
import LayoutContainer from "@/modules/layout/container";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "@/styles/globals.css";

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <LayoutContainer Component={Component} pageProps={pageProps} />
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position='top-right'
        transitionIn='fadeIn'
        transitionOut='fadeOut'
        progressBar
        closeOnToastrClick
      />
    </Provider>
  );
}
