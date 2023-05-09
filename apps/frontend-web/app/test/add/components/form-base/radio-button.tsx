"use client"
import clsx from 'clsx';
import React, { LegacyRef } from 'react';

export type RadioButtonOption = { label: string, value: string }
export type RadioButtonProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  required?: boolean;
  label?: string;
  item: RadioButtonOption
  className?: string;
  error?: string;
  checked?: boolean;
  styleVariant?: "style_1" | "style_2"
}

// eslint-disable-next-line react/display-name
const RadioButton = React.forwardRef((props: RadioButtonProps, ref: LegacyRef<HTMLInputElement>) => {
  const { required, label, item, className, error, checked, styleVariant = "style_1",  ...reset } = props;
  return (
    <div className={clsx("flex flex-col w-full", className)}>
      {label && <p
        className="text-neutral-text-primary text-13 leading-20 mb-1"
      >{required && <span className="mr-1 text-error-base inline-block">*</span>}{label}</p>}
      <div className="flex items-center">
        <input
          ref={ref}
          {...reset}
          hidden
          className="radio-input cursor-pointer"
          type="radio"
          id={item.value}
          value={item.value}
          checked={checked}
        />
        <label htmlFor={item.value} className={clsx("border border-neutral-border border-solid w-4 h-4 rounded-full flex items-center justify-center", {
          "radio-input-temp": styleVariant === "style_1",
          "radio-input-temp-2": styleVariant === "style_2",
        })}>
          <div className={clsx("radio-input-circle w-2 h-2 rounded-full", {
            "radio-input-circle": styleVariant === "style_1",
            "radio-input-circle-2": styleVariant === "style_2",
          })}></div>
        </label>
        <label className="cursor-pointer inline-block text-neutral-text-primary text-13 leading-20 ml-2" htmlFor={item.value}>{item.label}</label>
      </div>
      {error && <p className="mt-1 text-error-base">{error}</p>}
    </div >
  )
});

export default RadioButton
