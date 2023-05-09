import { SelectBoxProps } from './types';
import React, { LegacyRef } from 'react';

export const SelectBox = React.forwardRef(
  (props: SelectBoxProps, ref: LegacyRef<HTMLSelectElement>) => {
    const {
      options,
      defaultValue,
      onChange,
      label,
      rightIcon,
      placeholder,
      disabled,
      className,
      size,
      variant,
      ..._props
    } = props;

    const defaultClass =
      'w-full appearance-none focus:outline-none cursor-pointer pl-[12px] pr-[48px] font-normal text-15';
    const disableClass =
      'border border-neutral-disable bg-neutral-disable text-neutral-placeholder';
    const enableClass =
      'border hover:border-neutral-placeholder focus:border-primary-base focus:border-[2px] focus:bg-neutral-white focus:text-neutral-text-primary';
    const [classes, setClasses] = React.useState(
      'border-neutral-text-primary text-neutral-primary bg-neutral-white'
    );

    const styles = useStyles(props);

    return (
      <div className={`${styles.root} ${className ? className : ''}`}>
        {label && (
          <div
            className={`text-neutral-placeholder text-13 font-medium ${styles.label}`}
          >
            {label}
          </div>
        )}
        <div className={`relative w-full`}>
          <select
            {..._props}
            ref={ref}
            className={`
            ${defaultClass}
            ${styles.select}
            ${disabled ? disableClass : ` ${enableClass} ${classes} `}
          `}
            onChange={(e) => {
              onChange?.(e);
              setClasses(
                e.target.value
                  ? 'border-neutral-text-primary text-neutral-primary bg-neutral-white'
                  : 'border-neutral-border bg-neutral-background text-neutral-placeholder'
              );
            }}
            defaultValue={defaultValue}
            disabled={disabled}
          >
            {placeholder && <option value={''}>{placeholder}</option>}
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          {rightIcon && (
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2">
              {rightIcon}
            </div>
          )}
        </div>
      </div>
    );
  }
);

const useStyles = ({ size, variant }: SelectBoxProps) => {
  return {
    root: variant === 'horizontal-label' ? 'flex items-center' : '',
    label: variant === 'horizontal-label' ? 'mr-[8px]' : 'mb-[8px]',
    select: `
      ${size === 'small' ? 'py-[4px]' : ''}
      ${size === 'medium' ? 'py-[8px]' : ''}
      ${size === 'large' ? 'py-[12px]' : ''}
    `,
  };
};
