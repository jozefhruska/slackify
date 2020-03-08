import App, { AppProps, AppContext } from 'next/app';
import { ThemeProvider } from 'styled-components';

import theme from '../src/theme';
import { getAuthToken } from '../src/cookies';
import { BaseProps } from '../src/types/common';
import { GlobalStyles } from '../src/styles';
import Head from 'next/head';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

/* <AppWrapper />
============================================================================= */
const AppWrapper = ({ Component, pageProps }: AppProps & BaseProps) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Head>
      <link
        href="https://fonts.googleapis.com/css?family=Lato:300,400,700|Roboto:300,400,700&display=swap"
        rel="stylesheet"
      />
    </Head>

    <Component {...pageProps} />
  </ThemeProvider>
);

/* <AppWrapper /> - getInitialProps
============================================================================= */
AppWrapper.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  const authToken = getAuthToken(appContext?.ctx);

  return {
    ...appProps,
    authToken,
    pageProps: {
      ...appProps.pageProps,
      authToken,
    },
  };
};

export default AppWrapper;
