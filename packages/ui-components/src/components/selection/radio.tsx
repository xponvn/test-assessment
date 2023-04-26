import clsx from 'clsx';
import * as React from 'react';

export interface RadioButtonProps {
  value: string;
  name: string;
  text: string;
  onChange?: (value: string) => void;
  disable?: boolean;
  checkedValue?: string;
  labelClassName?: string;
  className?: string;
}
export const RadioButton = (props: RadioButtonProps) => {
  const {
    checkedValue= '',
    name = '',
    value,
    onChange,
    disable = false,
    text,
    labelClassName = '',
    className = '',
  } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.currentTarget.value);
  };

  return (
    <label className={`container-radio flex items-center ${className}`}>
      <input
        disabled={disable}
        className="m-0 opacity-0 absolute radio-input"
        type="radio"
        name={name}
        checked={checkedValue===value}
        value={value}
        onChange={handleChange}
      />
      <div
        className={clsx(
          'flex flex-shrink-0 justify-center items-center w-[16px] h-[16px] border-2 border-solid border-neutral-border rounded-[50%]',
          {
            'border-neutral-border': checkedValue!==value,
            'border-primary-clicked': checkedValue===value,
          }
        )}
      >
        <div
          className={clsx(
            'w-[8px] h-[8px] rounded-[50%] bg-primary-clicked',
            {
              'opacity-0': checkedValue!==value
            }
          )}
        ></div>
      </div>
      <span className={`${labelClassName}`}>{text}</span>
    </label>
  );
};
