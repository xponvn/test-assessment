import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { ApiClientProvider } from '@test-assessment/cms-graphql-api';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ApiClientProvider apiUrl={publicRuntimeConfig.graphqlApiUrl}>
      <Head>
        <title>Welcome to frontend-web!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </ApiClientProvider>
  );
}

export default CustomApp;
