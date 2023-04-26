import React from 'react';
import { Icon, IconName } from '../icons';

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
  const iconName = variantToIconName[variant] as IconName;
  const textColor = variantToTextColor[variant];

  return (
    <div className="flex space-x-1 items-center">
      {iconName && <Icon name={iconName} style={{ color: textColor }} />}

      <p className={`${textColor} text-13 font-normal leading-6 font-primary`}>
        {children}
      </p>
    </div>
  );
};
