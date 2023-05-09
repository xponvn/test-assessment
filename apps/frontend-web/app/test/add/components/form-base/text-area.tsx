'use client';
import { Icon } from '@test-assessment/ui-components';
import clsx from 'clsx';
import React, { LegacyRef } from 'react';

export type TextAreaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  placeholder?: string;
  required?: boolean;
  label?: string;
  className?: string;
  error?: string;
};

// eslint-disable-next-line react/display-name
const TextArea = React.forwardRef(
  (props: TextAreaProps, ref: LegacyRef<HTMLTextAreaElement>) => {
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
        <textarea
          ref={ref}
          {...reset}
          placeholder={placeholder}
          className={clsx(
            'border border-solid py-[5px] px-3 outline-none text-15 leading-24 text-neutral-text-primary min-h-[64px] placeholder:text-13 placeholder:leading-6 placeholder:text-neutral-placeholder',
            {
              'border-error-base bg-error-bg': error,
              'border-neutral-border bg-transparent': !error,
            }
          )}
        />
        {error && <p className="text-error text-13 font-normal leading-6 font-primary flex items-center mt-2">
          <Icon name="caution" className="text-error mr-1" />
          {error}
        </p>}      </div>
    );
  }
);

export default TextArea;
