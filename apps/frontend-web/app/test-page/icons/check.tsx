import React from 'react';
import { IconProps } from '.';
import clsx from 'clsx';

export default function Check({ className, transform }: IconProps) {
  return (
    <svg
      className={clsx(className, 'w-6', 'w-6')}
      transform={transform}
      width="11"
      height="9"
      viewBox="0 0 11 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.91308 4.03516H1.91326C1.99256 4.03525 2.07081 4.05331 2.14213 4.08798C2.21341 4.12262 2.27591 4.17295 2.32497 4.2352L1.91308 4.03516ZM1.91308 4.03516H1.09394C0.890308 4.03516 0.776602 4.26975 0.902321 4.4292L0.902371 4.42927L4.11214 8.49567L4.11218 8.49573C4.32247 8.76188 4.72568 8.76114 4.93667 8.49617L4.93708 8.49566L10.6597 1.24398C10.6598 1.24377 10.66 1.24357 10.6602 1.24336C10.7884 1.08293 10.6699 0.85 10.4689 0.85H9.6498C9.48941 0.85 9.33668 0.923501 9.2376 1.05044C9.23751 1.05055 9.23742 1.05066 9.23734 1.05077L4.52403 7.02157M1.91308 4.03516L4.52403 7.02157M4.52403 7.02157L2.32506 4.23531L4.52403 7.02157Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.3"
      />
    </svg>
  );
}
