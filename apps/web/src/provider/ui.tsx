'use client';

import React, { useState } from 'react';

const UIContext = React.createContext({});

export type Props = {
  children: React.ReactNode;
};

export const UIProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  return <UIContext.Provider value={{ theme, setTheme }}>{children}</UIContext.Provider>;
};
