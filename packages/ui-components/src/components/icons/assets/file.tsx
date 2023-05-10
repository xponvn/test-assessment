import { IconProps } from '..';
import clsx from 'clsx';

export default function File({ className, transform }: IconProps) {
  return (
    <svg
      className={clsx(className, 'w-6', 'w-6')}
      transform={transform}
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 17H9V12.825L10.6 14.425L12 13L8 9L4 13L5.425 14.4L7 12.825V17ZM2 20C1.45 20 0.979002 19.804 0.587002 19.412C0.195002 19.02 -0.000664969 18.5493 1.69779e-06 18V2C1.69779e-06 1.45 0.196001 0.979002 0.588001 0.587002C0.980001 0.195002 1.45067 -0.000664969 2 1.69779e-06H10L16 6V18C16 18.55 15.804 19.021 15.412 19.413C15.02 19.805 14.5493 20.0007 14 20H2ZM9 7H14L9 2V7Z"
        fill="black"
      />
    </svg>
  );
}
