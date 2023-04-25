"use client"
import { UIProvider } from '@test-assessment/ui-theme';
import '../styles/index.css';
import themeToken from '@test-assessment/ui-theme/theme-token/frontend-web.json';
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
        >
          <UIProvider config={themeToken.variants}>
            {children}
          </UIProvider>
        </ApiClientProvider>
      </body>
    </html>
  )
}
