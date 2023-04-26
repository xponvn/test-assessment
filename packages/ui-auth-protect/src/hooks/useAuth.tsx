'use client';
import { useState, useEffect } from 'react';
import { LoginResult } from '../context/ui-auth-protect';

export default function useAuthProvider() {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const storeUser = (data: LoginResult) => {
    setUser(JSON.stringify(data?.user));
    setToken(data.token);
    if (window && typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(data?.user));
      localStorage.setItem('token', data?.token);
    }
  };
  useEffect(() => {
    async function loadUser() {
      if (window && typeof window !== 'undefined') {
        setToken(localStorage.getItem('token'));
        setUser(localStorage.getItem('user'));
      }
    }
    loadUser();
  }, []);
  return {
    user,
    storeUser,
  };
}
