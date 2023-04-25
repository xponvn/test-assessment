import * as React from 'react';

export interface RadioButtonProps {
  value: string;
  name: string;
  text: string;
  onChange?: (value: string, check: string) => void;
  disable?: boolean;
  checked: boolean;
  labelClassName?: string;
  className?: string;
}
export const RadioButton = (props: RadioButtonProps) => {
  const {
    checked,
    name = '',
    value,
    onChange,
    disable = false,
    text,
    labelClassName = '',
    className = '',
  } = props;
  const checkedRef = React.useRef(checked);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateInput(inputRef, checkedRef.current);
    if (onChange) onChange(value, e.currentTarget.value);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateInput = (ref: any, checked: boolean) => {
    const input = ref.current;
    if (input) {
      input.checked = checked;
    }
  };
  React.useEffect(() => {
    checkedRef.current = checked;
    updateInput(inputRef, checked);
  }, [checked]);
  return (
    <label className={`container-radio flex items-center ${className}`}>
      <input
        disabled={disable}
        className="m-0 invisible radio-input"
        type="radio"
        name={name}
        value={value}
        onChange={handleChange}
      />
      <span className="custom-radio  w-[16px] h-[16px] border-2 border-solid border-neutral-border rounded-[50%] inline-block relative" />
      <span className={`${labelClassName}`}>{text}</span>
    </label>
  );
};
