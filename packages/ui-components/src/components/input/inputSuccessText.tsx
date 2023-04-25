import React from 'react';
import { Icon } from '../Icon';

export interface InputSuccessProps {
  children: React.ReactNode;
}
export const InputSuccessText = ({ children }: InputSuccessProps) => (
  <div className="flex space-x-1 items-center h-7">
    <Icon name="success" width={24} height={24} color="text-success" />
    <p className="text-success text-13 font-normal leading-6 font-primary">
      {children}
    </p>
  </div>
);
