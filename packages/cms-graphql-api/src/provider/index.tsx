'use client';

import { GraphQLClient } from 'graphql-request';
import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { getSdk } from '../generated';

const defaultHeaders = {};

const getHeaders = (token?: string | null) => {
  const newHeaders: Record<string, string> = { ...defaultHeaders };
  if (token) {
    newHeaders['Authorization'] = `bearer ${token?.split(' ')?.pop()}`;
  }
  return newHeaders;
};

export const getApiClient = (
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  apiUrl = process.env.GRAPHQL_API_URL || '/graphql',
  token?: string | null
) =>
  getSdk(
    new GraphQLClient(apiUrl, {
      headers: getHeaders(token),
    })
  );

export const ApiClientContext = React.createContext({
  apiClient: getApiClient(''),
  setToken: (_token?: string | null) => {},
});

type ApiClientProviderProps = {
  apiUrl: string;
  children: ReactNode;
  token?: string | null;
};

export const ApiClientProvider = (props: ApiClientProviderProps) => {
  const [token, setToken] = useState(props.token);

  const apiClient = useMemo(
    () => getApiClient(props.apiUrl, token),
    [token, props.apiUrl]
  );

  useEffect(() => {
    setToken(props.token);
  }, [props.token]);

  return (
    <ApiClientContext.Provider
      value={{
        apiClient,
        setToken,
      }}
    >
      {props.children}
    </ApiClientContext.Provider>
  );
};

export const useApiClient = () => {
  return useContext(ApiClientContext);
};
