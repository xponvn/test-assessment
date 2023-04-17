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
}

// eslint-disable-next-line react/display-name
const RadioButton = React.forwardRef((props: RadioButtonProps, ref: LegacyRef<HTMLInputElement>) => {
  const { required, label, item, className, error, checked,  ...reset } = props;
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
        <label htmlFor={item.value} className="radio-input-temp border border-solid border-neutral-border w-4 h-4 rounded-full flex items-center justify-center">
          <div className="radio-input-circle w-2 h-2 rounded-full"></div>
        </label>
        <label className="cursor-pointer inline-block text-neutral-text-primary text-13 leading-20 ml-2" htmlFor={item.value}>{item.label}</label>
      </div>
      {error && <p className="mt-1 text-error-base">{error}</p>}
    </div >
  )
});

export default RadioButton
