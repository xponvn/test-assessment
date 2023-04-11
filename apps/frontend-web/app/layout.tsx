"use client"
import { UIProvider } from '@test-assessment/ui-theme';
import '../styles/index.css';
import themeToken from '@test-assessment/ui-theme/theme-token/frontend-web.json';
import RootHeader from './header';
import { ApiClientProvider } from '@test-assessment/cms-graphql-api';
import getConfig from 'next/config';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { publicRuntimeConfig } = getConfig();

  return (
    <html lang="en">
      <ApiClientProvider apiUrl={publicRuntimeConfig.graphqlApiUrl}>
        <UIProvider config={themeToken.variants}>
          <RootHeader />
          {children}
        </UIProvider>
      </ApiClientProvider>
    </html>
  )
}
