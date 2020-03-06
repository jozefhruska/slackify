import { useEffect } from 'react';
import App, { AppProps, AppContext } from 'next/app';
import { ThemeProvider } from 'styled-components';

import * as THEMES from '../src/themes';
import { getColorScheme, getAuthToken } from '../src/cookies';
import { BaseProps } from '../src/types/common';
import { GlobalStyles } from '../src/styles';

/* <AppWrapper />
============================================================================= */
const AppWrapper = ({ Component, pageProps, colorScheme }: AppProps & BaseProps) => (
  <ThemeProvider theme={THEMES[colorScheme]}>
    <GlobalStyles theme={THEMES[colorScheme]} />

    <Component {...pageProps} />
  </ThemeProvider>
);

/* <AppWrapper /> - getInitialProps
============================================================================= */
AppWrapper.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  const authToken = getAuthToken(appContext?.ctx);
  const colorScheme = getColorScheme(appContext?.ctx);

  return {
    ...appProps,
    colorScheme,
    authToken,
    pageProps: {
      ...appProps.pageProps,
      colorScheme,
      authToken,
    },
  };
};

export default AppWrapper;
