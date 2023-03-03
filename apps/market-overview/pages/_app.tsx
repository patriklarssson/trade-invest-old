import { Global, ThemeProvider } from '@emotion/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { theme } from '@trade-invest/theme';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme[0]}>
      <Global styles={{ body: { margin: 0, backgroundColor: '#f6f6f6' } }} />
      <Head>
        <title>Welcome to market-overview!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}

export default CustomApp;
