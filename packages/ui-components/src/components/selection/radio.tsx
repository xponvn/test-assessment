import clsx from 'clsx';
import * as React from 'react';

export interface RadioButtonProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  value: string;
  name: string;
  text: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  disable?: boolean;
  labelclassname?: string;
  className?: string;
  checked?: boolean;
}
export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  (props: RadioButtonProps, ref) => {
    const {
      checked = false,
      name = '',
      value,
      onChange,
      disable = false,
      text,
      labelclassname = '',
      className = '',
    } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e);
    };

    return (
      <label className={`container-radio flex items-center ${className}`}>
        <input
          {...props}
          disabled={disable}
          className="m-0 opacity-0 absolute radio-input"
          type="radio"
          name={name}
          checked={checked}
          value={value}
          onChange={handleChange}
        />
        <div
          className={clsx(
            'flex flex-shrink-0 justify-center items-center w-[16px] h-[16px] border-2 border-solid border-neutral-border rounded-[50%]',
            {
              'border-neutral-border': !checked,
              'border-primary-clicked': checked,
            }
          )}
        >
          <div
            className={clsx(
              'w-[8px] h-[8px] rounded-[50%] bg-primary-clicked',
              {
                'opacity-0': !checked,
              }
            )}
          ></div>
        </div>
        <span className={`${labelclassname}`}>{text}</span>
      </label>
    );
  }
);
