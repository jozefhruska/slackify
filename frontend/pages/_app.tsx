import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import Head from 'next/head';

import theme from '../src/theme';
import { GlobalStyles } from '../src/styles';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-tippy/dist/tippy.css';
import 'normalize.css';

/* <AppWrapper />
============================================================================= */
const AppWrapper = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default AppWrapper;
