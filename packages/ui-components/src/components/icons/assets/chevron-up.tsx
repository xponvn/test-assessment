import React from 'react';
import { IconProps } from '..';
import clsx from 'clsx';

export default function ChevronUp({ className, transform }: IconProps) {
  return (
    <svg
      className={clsx(className, 'w-6', 'w-6')}
      transform={transform}
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.523314 6L9.47669 6C9.92332 6 10.1639 5.47325 9.87269 5.13299L5.79201 0.365226C5.37521 -0.121743 4.62479 -0.121743 4.208 0.365227L0.127311 5.13299C-0.163912 5.47325 0.0766783 6 0.523314 6Z"
        fill="currentColor"
      />
    </svg>
  );
}
