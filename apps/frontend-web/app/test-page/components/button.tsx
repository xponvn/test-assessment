import clsx from 'clsx';
import React, { ReactNode } from 'react'

type ButtonProps = {
  label: string;
  onClick: () => void;
  icon?: JSX.Element | ReactNode;
  className?: string;
  style?: "style_1" | "style_2";
};

export default function Button({ label, onClick, icon, className, style }: ButtonProps) {
  return (
    <button onClick={onClick} className={clsx(className, "outline-none text-13 leading-20 font-bold py-[10px] px-5 uppercase text-neutral-text-primary flex items-center", {
      "bg-neutral-white border-primary-base border border-solid hover:bg-primary-base hover:text-neutral-white transition-all": style === "style_1",
      "bg-primary-base border-primary-base border border-solid hover:bg-neutral-white hover:text-primary-base transition-all": style === "style_2",

    })}>{label}{icon}</button>
  )
}

