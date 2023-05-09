"use client"
import clsx from 'clsx';
import React, { LegacyRef } from 'react';

export type RadioButtonGroupOption = { label: string, value: string }
export type RadioButtonGroupProps = React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>,
HTMLInputElement
> & {
  required?: boolean;
  label?: string;
  options: RadioButtonGroupOption[]
  className?: string;
  onClick?: (value: string) => void;
  error?: string;
}

// eslint-disable-next-line react/display-name
const RadioButtonGroup = React.forwardRef((props: RadioButtonGroupProps, ref: LegacyRef<HTMLInputElement>) => {
  const { required, label, options, className, error, onClick, ...reset } = props;
  return (
    <div className={clsx("flex flex-col w-fit", className)}>
      <p
        className="font-medium text-neutral-placeholder text-13 leading-6"
      >{required && <span className="mr-1 text-error-base inline-block">*</span>}{label}:</p>
      <div className="flex items-center justify-between mt-2 gap-6 flex-wrap">
        {options.map((item, index) => {
          return (<div key={index}>
            <div key={index} className="flex items-center">
              <input
                ref={ref}
                {...reset}
                onClick={() => onClick && onClick(item.value)}
                hidden
                className="radio-input cursor-pointer"
                type="radio"
                id={item.value}
                value={item.value}
              />
              <label htmlFor={item.value} className="radio-input-temp border border-solid border-primary-clicked w-4 h-4 rounded-full flex items-center justify-center">
                <div className="radio-input-circle w-2 h-2 rounded-full"></div>
              </label>
              <label className="cursor-pointer inline-block text-neutral-text-primary text-13 leading-20 ml-2" htmlFor={item.value}>{item.label}</label>
            </div>
            {error && <p className="mt-1 text-error-base">{error}</p>}
          </div>);
        })}
      </div >
    </div >
  )
});

export default RadioButtonGroup;
