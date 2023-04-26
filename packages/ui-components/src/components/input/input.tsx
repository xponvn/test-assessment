import React, { useState } from 'react';
import clsx from 'clsx';
import { Icon } from '../Icon';
import { InputHelpText } from './inputHelpText';

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
  fill?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  size?: InputSize;
  infoText?: string;
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

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      label,
      error,
      type = InputType.TEXT,
      width = 400,
      fill,
      size = InputSize.MEDIUM,
      rightIcon,
      leftIcon,
      infoText,
      successText,
      value: rootValue,
      onChange,
      ...props
    }: InputProps,
    ref
  ) => {
    const [currentType, setCurrentType] = useState(type);
    const [value, setValue] = useState(rootValue);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event?.target?.value);
      onChange && onChange(event);
    };

    const classNames = clsx(
      'flex border-[1px] px-3',
      'text-13 leading-6 font-normal font-primary',
      'placeholder-neutral-border',
      'hover:border-neutral-placeholder',
      'focus-within:border-primary',
      'hover:focus-within:border-primary',
      !value && 'border-neutral-border',
      error && 'border-error-border bg-error-bg',
      successText && 'border-success-border bg-success-bg',
      fill ? 'w-full' : `w-[${width}px]`,
      {
        [InputSize.LARGE]: 'p-3',
        [InputSize.MEDIUM]: 'p-2',
        [InputSize.SMALL]: 'p-1',
      }[size],
      props.disabled && 'border-none bg-neutral-disable'
    );
    const isHelpTextVisible = error || infoText || successText;

    return (
      <div className="space-y-2">
        {label && <Label htmlFor={name} label={label} />}

        <div className={classNames}>
          {leftIcon && <InputIcon type={type} />}

          <input
            {...props}
            value={value}
            onChange={handleOnChange}
            ref={ref}
            id={name}
            type={currentType}
            className={`focus:outline-none bg-transparent w-full`}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${name}-error` : undefined}
          />

          {type === InputType.PASSWORD && (
            <button
              className="flex pl-2"
              onClick={() => {
                setCurrentType((type) =>
                  type === 'password' ? InputType.TEXT : InputType.PASSWORD
                );
              }}
            >
              <InputIcon
                type={
                  currentType === InputType.PASSWORD ? 'eyeShow' : 'eyeHide'
                }
              />
            </button>
          )}

          {rightIcon && <InputIcon type={type} />}
        </div>

        <div className={isHelpTextVisible ? 'opacity-100' : 'opacity-0'}>
          {error && <InputHelpText variant="error">{error}</InputHelpText>}
          {infoText && <InputHelpText variant="info">{infoText}</InputHelpText>}
          {successText && (
            <InputHelpText variant="success">{successText}</InputHelpText>
          )}
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

const InputIcon = ({ type }: { type: string }) => (
  <Icon name={type} width={24} height={24} color="text-neutral-placeholder" />
);
