import clsx from 'clsx';
import React, { ReactNode } from 'react'

type ButtonProps = {
  label: string;
  onClick: () => void;
  icon?: JSX.Element | ReactNode;
  className?: string;
};

export default function Button({ label, onClick, icon, className }: ButtonProps) {
  return (
  <button onClick={onClick} className={clsx(className, "bg-primary-base py-2 flex items-center px-[38px] font-bold text-13 leading-6 text-neutral-text-primary")}>
    {label}
    {icon}
  </button>
  )
}
