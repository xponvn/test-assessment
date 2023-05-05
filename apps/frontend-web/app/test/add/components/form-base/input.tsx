'use client';
import clsx from 'clsx';
import React, { LegacyRef } from 'react';

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  placeholder?: string;
  required?: boolean;
  label?: string;
  className?: string;
  error?: string;
};

// eslint-disable-next-line react/display-name
const Input = React.forwardRef(
  (props: InputProps, ref: LegacyRef<HTMLInputElement>) => {
    const {
      placeholder,
      required,
      label,
      className,
      error,
      ...reset
    } = props;

    return (
      <div className={clsx('flex flex-col w-full', className)}>
        <label
          htmlFor={reset?.name}
          className="text-neutral-text-primary text-15 leading-24 mb-1"
        >
          {required && (
            <span className="mr-1 text-error-base inline-block">*</span>
          )}
          {label}
        </label>
        <input
          ref={ref}
          {...reset}
          placeholder={placeholder}
          className={clsx(
            'border border-solid py-[5px] px-3 outline-none text-15 leading-24 text-neutral-text-primary',
            {
              'border-error-base': error,
              'border-neutral-border': !error,
            }
          )}
        />
        {error && <p className="mt-1 text-error-base">{error}</p>}
      </div>
    );
  }
);

export default Input;
