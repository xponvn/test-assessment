import { IconProps } from '..';
import clsx from 'clsx';

export default function Caution({ className, transform }: IconProps) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM12 7.15918C12.4142 7.15918 12.75 7.49497 12.75 7.90918V12.8183C12.75 13.2325 12.4142 13.5683 12 13.5683C11.5858 13.5683 11.25 13.2325 11.25 12.8183V7.90918C11.25 7.49497 11.5858 7.15918 12 7.15918ZM12 16.9909C12.4971 16.9909 12.9 16.588 12.9 16.0909C12.9 15.5939 12.4971 15.1909 12 15.1909C11.5029 15.1909 11.1 15.5939 11.1 16.0909C11.1 16.588 11.5029 16.9909 12 16.9909Z"
        fill="#C43C3C"
      />
    </svg>
  );
}
