import '../styles/index.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { ApiClientProvider } from '@test-assessment/cms-graphql-api';
import getConfig from 'next/config';
import { UIProvider } from '@test-assessment/ui-theme';
import themeToken from '../theme-token/token.json';

const { publicRuntimeConfig } = getConfig();

function App({ Component, pageProps }: AppProps) {
  return (
    <ApiClientProvider apiUrl={publicRuntimeConfig.graphqlApiUrl}>
      <UIProvider config={themeToken.variants}>
        <Head>
          <title>Welcome to frontend-web!</title>
        </Head>
        <Component {...pageProps} />
      </UIProvider>
    </ApiClientProvider>
  );
}

export default App;
