import * as React from 'react';

export interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return <button onClick={() => onClick && onClick()}>{children}</button>;
};
