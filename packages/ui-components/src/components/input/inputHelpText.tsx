import React from 'react';
import { Icon } from '../Icon';

export interface InputHelpTextProps {
  children: React.ReactNode;
  variant: 'info' | 'error' | 'success';
}
export enum InputHelpTextVariant {
  INFO = 'info',
  ERROR = 'error',
  SUCCESS = 'success',
}

const variantToIconName: Record<string, string> = {
  [InputHelpTextVariant.ERROR]: 'caution',
  [InputHelpTextVariant.SUCCESS]: 'success',
};
const variantToTextColor: Record<string, string> = {
  [InputHelpTextVariant.ERROR]: 'text-error',
  [InputHelpTextVariant.SUCCESS]: 'text-success',
};

export const InputHelpText = ({ children, variant }: InputHelpTextProps) => {
  const iconName = variantToIconName[variant];
  const textColor = variantToTextColor[variant];
  return (
    <div className="flex space-x-1 items-center h-7">
      {iconName && (
        <Icon name={iconName} width={24} height={24} color={textColor} />
      )}

      <p className={`${textColor} text-13 font-normal leading-6 font-primary`}>
        {children}
      </p>
    </div>
  );
};
