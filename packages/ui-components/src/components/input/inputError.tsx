import React from 'react';
import { Icon } from '../Icon';

export interface InputErrorProps {
  children: React.ReactNode;
}
export const InputError = ({ children }: InputErrorProps) => (
  <div className="flex space-x-1 items-center">
    <Icon name="caution" width={24} height={24} color="text-error" />
    <p className="text-error text-13 font-normal leading-6 font-primary">
      {children}
    </p>
  </div>
);
