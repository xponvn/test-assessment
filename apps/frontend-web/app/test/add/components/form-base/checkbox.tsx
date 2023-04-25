"use client"
import clsx from 'clsx';
import { LegacyRef } from 'react';
import React from 'react';
import { RenderIcon } from '../../../icons';

export type CheckboxOption = { label: string, value: string }
export type CheckboxProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  required?: boolean;
  label?: string;
  item: CheckboxOption
  className?: string;
  error?: string;
  checked?: boolean;
}

// eslint-disable-next-line react/display-name
const Checkbox = React.forwardRef((props: CheckboxProps, ref: LegacyRef<HTMLInputElement>) => {
  const { label, required, item, className, checked, error, ...reset } = props;

  return (
    <div className={clsx("flex flex-col w-full", className)}>
      {label && <p
        className="text-neutral-text-primary text-13 leading-20 mb-1"
      >{required && <span className="mr-1 text-error-base inline-block">*</span>}{label}</p>}
      <>
        <div className="flex items-center">
          <input ref={ref} {...reset}
            hidden
            className="checkbox-input cursor-pointer"
            type="checkbox"
            id={item.value}
            value={item.value}
            checked={checked}
          />
          <label htmlFor={item.value} className="checkbox-input-term border border-solid border-neutral-border w-4 h-4 flex items-center justify-center bg-success rounded-[2px]">
            <RenderIcon name="check" className="checkbox-input-icon text-white" />
          </label>
          <label className="cursor-pointer inline-block text-neutral-text-primary text-13 leading-20 ml-2" htmlFor={item.value}>{item.label}</label>
        </div>
        {error && <p className="mt-1 text-error-base">{error}</p>}
      </>
    </div >
  )
});

export default Checkbox;
