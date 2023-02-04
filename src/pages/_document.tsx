import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link href="https://diegoddox.github.io/react-redux-toastr/7.1/react-redux-toastr.min.css"
              rel="stylesheet"
              type="text/css"
        />
        <meta name="description" content="Web application for booking cinema tickets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
      <Main />
      <NextScript />
      </body>
    </Html>
  );
}
