'use client';
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext } from 'react';
import useAuthProvider from '../hooks/useAuth';

export type LoginResult = {
  token: string;
  user: {
    id: string;
    email: string;
  };
};

const authContext = createContext({
  loading: false,
  user: typeof window !== 'undefined' ? localStorage.getItem('user') : null,
  storeUser: (data: LoginResult) => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};
