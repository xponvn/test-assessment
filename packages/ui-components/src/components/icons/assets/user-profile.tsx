import React from 'react';
import { IconProps } from '..';
import clsx from 'clsx';

export default function UserProfile({ className, transform }: IconProps) {
  return (
    <svg
      className={clsx(className, 'w-6', 'w-6')}
      transform={transform}
      width="12"
      height="14"
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.99999 7C4.35532 7 3.01132 5.65667 3.01132 4.01133C3.01132 2.366 4.35532 1 5.99999 1C7.64466 1 8.98866 2.34333 8.98866 3.98867C8.98866 5.634 7.64466 7 5.99999 7ZM10.6667 13H1.33332C0.966656 13 0.666656 12.7 0.666656 12.3333V11.6667C0.666656 10.2 1.86666 9 3.33332 9H8.66666C10.1333 9 11.3333 10.2 11.3333 11.6667V12.3333C11.3333 12.7 11.0333 13 10.6667 13Z"
        stroke="#380559"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
