'use client';
import { Icon } from '@test-assessment/ui-components';
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
          className="block text-13 leading-6 font-medium font-primary text-neutral-placeholder"
        >
          {label}
          {required && (
            <span className="pl-[2px] text-error-base inline-block">*</span>
          )}
        </label>
        <select
          ref={ref}
          {...reset}
          className={clsx(
            'border border-solid py-[5px] px-3 outline-none text-15 leading-24 text-neutral-text-primary min-h-[40px] capitalize focus:border-primary',
            {
              'border-error-base bg-error-bg': error,
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
        {error && <p className="text-error text-13 font-normal leading-6 font-primary flex items-center mt-2">
          <Icon name="caution" className="text-error mr-1" />
          {error}
        </p>}
      </div>
    );
  }
);

export default Select;
