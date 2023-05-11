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
  apiUrl = 'http://localhost:1337/graphql' || '/graphql',
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
  const [token, setToken] = useState(
    '8a7402a2ef58fe8cc37bed228705892a89d7fe81b5862444ad83cb58058f3d0e66a30c42fb175a85caab5dfdf0b93d60330750d8cfd47665129ccefbe84428ab1be55dde731aab89f0f192e2cef543e9f47feab8a25af46b0eded64fed07731a8b5cf0fcd018943dc331935c49a71422351b1a6421376d881e2ae265f04c1ed3'
  );

  const apiClient = useMemo(
    () =>
      getApiClient(
        props.apiUrl,
        '8a7402a2ef58fe8cc37bed228705892a89d7fe81b5862444ad83cb58058f3d0e66a30c42fb175a85caab5dfdf0b93d60330750d8cfd47665129ccefbe84428ab1be55dde731aab89f0f192e2cef543e9f47feab8a25af46b0eded64fed07731a8b5cf0fcd018943dc331935c49a71422351b1a6421376d881e2ae265f04c1ed3'
      ),
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
