import React from 'react';
import { InputError } from './inputError';
import { InputIcon, InputIconType } from './inputIcon';

export interface InputProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'size'
  > {
  label?: string;
  error?: string;
  width?: number;
  block?: boolean;
  leftIcon?: InputIconType;
  rightIcon?: InputIconType;
  placeholder?: string;
  disabled?: boolean;
  size?: InputSize;
  helperText?: string;
  successText?: string;
}
export enum InputType {
  PASSWORD = 'password',
  TEXT = 'text',
  DATETIME = 'datetime',
}
export enum InputSize {
  LARGE = 'lg',
  MEDIUM = 'md',
  SMALL = 'sm',
}

export const Input = React.forwardRef(
  (
    {
      name,
      label,
      error = '',
      type = InputType.TEXT,
      width = 200,
      block = false,
      size = InputSize.MEDIUM,
      rightIcon,
      leftIcon,
      ...props
    }: InputProps,
    ref
  ) => {
    const [currentType, setCurrentType] = React.useState(type);

    return (
      <div className="space-y-2">
        {label && <Label htmlFor={name} label={label} />}

        <div
          className={`relative text-15 leading-6 font-normal font-primary border-[1px] p-3 ${
            type === 'password' ? 'pr-12' : 'pr-3'
          } ${block ? 'w-full' : 'w-fit'} ${
            error
              ? 'border-error-border bg-error-bg'
              : 'border-neutral-border placeholder-neutral-border'
          }`}
        >
          {leftIcon && <InputIcon type={type} />}

          <input
            {...props}
            // @ts-expect-error passing input ref
            ref={ref}
            id={name}
            type={currentType}
            className={`focus:outline-none`}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${name}-error` : undefined}
            style={{ ...props.style, width: block ? '100%' : width + 'px' }}
          />

          {type === InputType.PASSWORD && (
            <button
              className="absolute right-3 top-3"
              onClick={() => {
                setCurrentType((type) =>
                  type === 'password' ? 'text' : 'password'
                );
              }}
            >
              <InputIcon
                type={
                  currentType === 'password'
                    ? InputIconType.PASSWORD_HIDDEN
                    : InputIconType.PASSWORD_VISIBLE
                }
              />
            </button>
          )}

          {rightIcon && <InputIcon type={type} />}
        </div>

        <div className={error ? 'opacity-100' : 'opacity-0'}>
          <InputError>{error}</InputError>
        </div>
      </div>
    );
  }
);

const Label = ({ htmlFor, label }: { htmlFor?: string; label: string }) => (
  <label
    htmlFor={htmlFor}
    className="block text-13 leading-6 font-medium font-primary text-neutral-placeholder"
  >
    {label}
  </label>
);
