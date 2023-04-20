"use client"
import { UIProvider } from '@test-assessment/ui-theme';
import '../styles/index.css';
import themeToken from '@test-assessment/ui-theme/theme-token/frontend-web.json';
import RootHeader from './header';
import { ApiClientProvider } from '@test-assessment/cms-graphql-api';
// import getConfig from 'next/config';
// const { publicRuntimeConfig } = getConfig() || {};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <ApiClientProvider 
          apiUrl={process.env.NEXT_PUBLIC_GRAPHQL_API_URL}
          token='f802c1d1f774cbe824c74ab1547795ff052574fa2b7f281577d7ff0c991d73c9b5098fac1e5a1b5ef86c4a1c16d26040479877e44cafbc83ce9268885ec7a2a400bf50556073b9385d6e6c2701e32db802af86894dcb7b87a5cfa38960864670bcff880a53e77353ae07d15f573e8f47072c4418ab3c561090c5bc4606d37054'
        >
          <UIProvider config={themeToken.variants}>
            <RootHeader />
            {children}
          </UIProvider>
        </ApiClientProvider>
      </body>
    </html>
  )
}
