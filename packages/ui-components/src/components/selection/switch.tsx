import clsx from 'clsx';
import { LegacyRef } from 'react';
import React from 'react';

export type SwitchProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  required?: boolean;
  label?: string;
  className?: string;
  error?: string;
  defaultCheck?: boolean;
  onSwitchChange?: (value: boolean) => void;
};

export const Switch = React.forwardRef(
  (props: SwitchProps, ref: LegacyRef<HTMLInputElement>) => {
    const {
      label,
      required,
      className,
      defaultCheck,
      onSwitchChange,
      error,
      ...reset
    } = props;

    return (
      <div className={clsx('flex flex-col', className)}>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            ref={ref}
            {...reset}
            className="sr-only peer"
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              onSwitchChange && onSwitchChange(e.currentTarget.checked)
            }
            defaultChecked={defaultCheck}
          />
          <div className="w-12 h-6 bg-neutral-divider peer-checked:bg-primary-clicked rounded-full peer-checked:after:translate-x-full  after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-white  after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          <span className="ml-3 text-neutral-text-primary text-13 leading-20">
            {label}
          </span>
        </label>

        {error && <p className="mt-1 text-error-base">{error}</p>}
      </div>
    );
  }
);
