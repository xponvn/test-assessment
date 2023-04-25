import React from 'react';
import { IconProps } from '.';
import clsx from 'clsx';

export default function ArrowRight({ className, transform }: IconProps) {
  return (
    <svg className={clsx(className, 'w-6', 'w-6')}
    transform={transform} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.5 18L15.5 12L9.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
