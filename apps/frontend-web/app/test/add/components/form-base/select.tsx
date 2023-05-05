'use client';
import clsx from 'clsx';
import React, { LegacyRef } from 'react';

export type SelectOption = {
  label: string;
  value: string;
  [key: string]: string;
};
export type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  placeholder?: string;
  required?: boolean;
  label?: string;
  options: SelectOption[];
  error?: string;
};

// eslint-disable-next-line react/display-name
const Select = React.forwardRef(
  (props: SelectProps, ref: LegacyRef<HTMLSelectElement>) => {
    const { placeholder, required, label, options, error, ...reset } = props;
    return (
      <div className="flex flex-col w-full">
        <label
          htmlFor={reset.name}
          className="text-neutral-text-primary text-15 leading-24 mb-1"
        >
          {required && (
            <span className="mr-1 text-error-base inline-block">*</span>
          )}
          {label}
        </label>
        <select
          ref={ref}
          {...reset}
          className={clsx(
            'border border-solid py-[5px] px-3 outline-none text-15 leading-24 text-neutral-text-primary min-h-[36px] capitalize',
            {
              'border-error-base': error,
              'border-neutral-border': !error,
            }
          )}
        >
          {(placeholder || placeholder.length <= 0) && (
            <option>{placeholder}</option>
          )}
          {options.map((item, index) => {
            return (
              <option value={item.value} key={index} className="capitalize">
                {item.label}
              </option>
            );
          })}
        </select>
        {error && <p className="mt-1 text-error-base">{error}</p>}
      </div>
    );
  }
);

export default Select;
