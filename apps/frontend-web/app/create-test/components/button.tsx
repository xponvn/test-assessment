import React from 'react'
import clsx from "clsx"

export type ButtonProps = {
  onClick?: () => void;
  label: string;
  style?: "style_1" | "style_2";
  className?: string;
}

export default function Button({
  onClick,
  label,
  style = "style_1",
  className
}: ButtonProps) {
  return (
    <button className={clsx(className, "outline-none text-13 leading-20 font-bold py-[10px] px-5 uppercase", {
      "text-secondary-base bg-neutral-white border-secondary-base border border-solid hover:bg-secondary-base hover:text-neutral-white transition-all": style === "style_1",
      "text-neutral-white bg-secondary-base border-secondary-base border border-solid hover:bg-neutral-white hover:text-secondary-base transition-all": style === "style_2",

    })}>{label}</button>
  )
}
