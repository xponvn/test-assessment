import React from 'react';
import { IconProps } from '..';
import clsx from 'clsx';

export default function Logout({ className, transform }: IconProps) {
  return (
    <svg
      className={clsx(className, 'w-6', 'w-6')}
      transform={transform}
      width="16"
      height="15"
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 10.5L9.5 13.5C9.5 14.052 9.052 14.5 8.5 14.5L1.5 14.5C0.948 14.5 0.5 14.052 0.5 13.5L0.500001 1.5C0.500001 0.947999 0.948001 0.499999 1.5 0.499999L8.5 0.5C9.052 0.5 9.5 0.948 9.5 1.5L9.5 4.5"
        stroke="#380559"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.5 7.5L15.5 7.5"
        stroke="#380559"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.5 10.5L15.5 7.5L12.5 4.5"
        stroke="#380559"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
