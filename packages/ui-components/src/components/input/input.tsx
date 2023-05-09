import React, { useState } from 'react';
import clsx from 'clsx';
import { InputHelpText } from './inputHelpText';
import { Icon, IconName } from '../icons';

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
  leftIcon?: IconName;
  rightIcon?: IconName;
  size?: InputSize;
  infoText?: string;
  successText?: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}
export enum InputType {
  PASSWORD = 'password',
  TEXT = 'text',
  SEARCH = 'search',
}
export enum InputSize {
  LARGE = 'lg',
  MEDIUM = 'md',
  SMALL = 'sm',
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
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
      defaultValue = '',
      className,
      ...props
    }: InputProps,
    ref
  ) => {
    const [currentType, setCurrentType] = useState(type);
    const [value, setValue] = useState(defaultValue);
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (rootValue === undefined) {
        return setValue(event?.target?.value);
      }
      onChange && onChange(event);
    };

    const isHelpTextVisible = error || infoText || successText;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={props.name}
            className="block text-13 leading-6 font-medium font-primary text-neutral-placeholder"
          >
            {label}
            {props.required && (
              <span className="pl-[2px] text-error-base">*</span>
            )}
          </label>
        )}

        <div
          className={clsx(
            'flex border-[1px]',
            'text-13 leading-6 font-normal font-primary',
            'placeholder-neutral-border',
            'hover:border-neutral-placeholder',
            'focus-within:border-primary',
            'hover:focus-within:border-primary',
            !rootValue && 'border-neutral-border',
            error && '!border-error-border bg-error-bg',
            successText && 'border-success-border bg-success-bg',
            type === InputType.SEARCH
              ? 'px-0 text-neutral-white bg-neutral-text-secondary !border-0'
              : 'px-3',
            props.disabled &&
            '!border-none !bg-neutral-disable !text-neutral-placeholder',
            className
          )}
          style={{ width: fill ? '100%' : width }}
        >
          {leftIcon && (
            <div className="flex items-center text-neutral-text-secondary pr-3">
              <Icon name={leftIcon} />
            </div>
          )}

          <input
            {...props}
            value={rootValue === undefined ? value : rootValue}
            onChange={handleOnChange}
            ref={ref}
            id={props.name}
            type={currentType}
            className={clsx(
              'focus:outline-none bg-transparent w-full',
              {
                [InputSize.LARGE]: 'py-3',
                [InputSize.MEDIUM]: 'py-2',
                [InputSize.SMALL]: 'py-1',
              }[size],
              // TODO: apply background opacity
              type === InputType.SEARCH &&
                'px-3 focus:border-neutral-white focus:border bg-neutral-text-primary',
              className
            )}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${props.name}-error` : undefined}
          />

          {type === InputType.PASSWORD && (
            <button
              className="flex items-center pl-2 text-neutral-text-secondary"
              onClick={() => {
                setCurrentType((type) =>
                  type === 'password' ? InputType.TEXT : InputType.PASSWORD
                );
              }}
            >
              <Icon
                name={
                  currentType === InputType.PASSWORD ? 'eye-show' : 'eye-hide'
                }
              />
            </button>
          )}

          {type === InputType.SEARCH && (
            <button
              className={clsx(
                'flex items-center bg-primary-base text-neutral-text-secondary',
                {
                  [InputSize.LARGE]: 'px-3',
                  [InputSize.MEDIUM]: 'px-2',
                  [InputSize.SMALL]: 'px-1',
                }[size]
              )}
              // @ts-expect-error todo
              onClick={props.onSubmit}
            >
              <Icon name="search" strokeWidth={40} />
            </button>
          )}

          {rightIcon && (
            <div className="flex items-center text-neutral-text-secondary pl-2">
              <Icon name={rightIcon} />
            </div>
          )}
        </div>

        {(error || infoText || successText) && <div className={isHelpTextVisible ? 'opacity-100' : 'opacity-0'}>
          {error && <InputHelpText variant="error">{error}</InputHelpText>}
          {infoText && <InputHelpText variant="info">{infoText}</InputHelpText>}
          {successText && (
            <InputHelpText variant="success">{successText}</InputHelpText>
          )}
        </div>}
      </div>
    );
  }
);
