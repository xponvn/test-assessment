import * as React from 'react';
import { Icon } from '../Icon';

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  error?: string;
  width?: number;
  block?: boolean;
}

export const Input = React.forwardRef(
  (
    {
      label,
      error = '',
      type = 'text',
      width = 200,
      block = false,
      ...props
    }: InputProps,
    ref
  ) => {
    const [currentType, setCurrentType] = React.useState(type);

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={props.name}
            className="block text-13 leading-6 font-medium font-primary text-neutral-placeholder"
          >
            {label}
          </label>
        )}

        <div
          className={`relative text-15 leading-6 font-normal font-primary border-[1px] p-3 ${
            type === 'password' ? 'pr-12' : 'pr-3'
          } ${block ? 'w-full' : 'w-fit'} ${
            error
              ? 'border-error-border bg-error-bg'
              : 'border-neutral-border placeholder-neutral-border'
          }`}
        >
          <input
            {...props}
            // @ts-expect-error passing input ref
            ref={ref}
            id={props.name}
            type={currentType}
            onChange={(event) => {
              if (props.onChange) props.onChange(event);
            }}
            className={`focus:outline-none ${props.className}`}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${props.name}-error` : undefined}
            style={{ ...props.style, width: block ? '100%' : width + 'px' }}
          />
          {type === 'password' && (
            <button
              className="absolute right-3 top-3"
              onClick={() => {
                setCurrentType((type) =>
                  type === 'password' ? 'text' : 'password'
                );
              }}
            >
              <Icon
                name={currentType === 'password' ? 'eyeShow' : 'eyeHide'}
                width={24}
                height={24}
                color="text-neutral-placeholder"
              />
            </button>
          )}
        </div>

        <div className={error ? 'opacity-100' : 'opacity-0'}>
          <InputError name={props.name}>{error}</InputError>
        </div>
      </div>
    );
  }
);

export const InputError = ({
  name,
  children,
}: React.PropsWithChildren<{ name?: string }>) => {
  if (!children) {
    return null;
  }

  return (
    <div className="flex space-x-1 items-center">
      <Icon name="caution" width={24} height={24} color="text-error" />
      <p
        id={name ? `${name}-error` : undefined}
        className="text-error text-13 font-normal leading-6 font-primary"
      >
        {children}
      </p>
    </div>
  );
};
