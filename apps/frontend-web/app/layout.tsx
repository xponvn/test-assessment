"use client"
import { UIProvider } from '@test-assessment/ui-theme';
import '../styles/index.css';
import themeToken from '@test-assessment/ui-theme/theme-token/frontend-web.json';
import RootHeader from './header';
import { ApiClientProvider } from '@test-assessment/cms-graphql-api';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig() || {};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <ApiClientProvider apiUrl={publicRuntimeConfig?.graphqlApiUrl}>
          <UIProvider config={themeToken.variants}>
            <RootHeader />
            {children}
          </UIProvider>
        </ApiClientProvider>
      </body>
    </html>
  )
}
