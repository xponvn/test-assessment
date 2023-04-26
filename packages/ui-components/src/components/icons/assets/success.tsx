import { IconProps } from '..';
import clsx from 'clsx';

export default function Success({ className, transform }: IconProps) {
  return (
    <svg
      className={clsx(className, 'w-6', 'w-6')}
      transform={transform}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM15.7122 10.994C16.0051 10.7011 16.0051 10.2262 15.7122 9.93334C15.4193 9.64044 14.9445 9.64044 14.6516 9.93334L11.3635 13.2214L9.34828 11.2061C9.05538 10.9132 8.58051 10.9132 8.28762 11.2061C7.99472 11.499 7.99472 11.9739 8.28762 12.2668L10.8332 14.8124C11.1261 15.1053 11.601 15.1053 11.8939 14.8124L15.7122 10.994Z"
        fill="#91B939"
      />
    </svg>
  );
}
