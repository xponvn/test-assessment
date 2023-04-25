import * as React from 'react';
import './style.css';
export interface CheckboxProps {
  checked: boolean | null;
  name?: string;
  onChange?: (check: boolean | null) => void;
  disable?: boolean;
  indeterminate?: boolean;
}

export const CheckBox = (props: CheckboxProps) => {
  const {
    checked,
    name = '',
    onChange,
    disable = false,
    indeterminate = false,
  } = props;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateInput = (ref: any, checked: boolean | null) => {
    const input = ref.current;
    if (input) {
      input.checked = checked;
      input.indeterminate = checked == null;
    }
  };
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const checkedRef = React.useRef(checked);
  React.useEffect(() => {
    checkedRef.current = checked;
    updateInput(inputRef, checked);
  }, [checked]);

  const handleClick = () => {
    switch (checkedRef.current) {
      case true:
        checkedRef.current = false;
        break;
      case false:
        if(indeterminate)
        checkedRef.current = null;
        else  checkedRef.current = true;

        break;
      default: // null
        checkedRef.current = true;
        break;
    }
    updateInput(inputRef, checkedRef.current);
    if (onChange) {
      onChange(checkedRef.current);
    }
  };

  return (
    <label className="container-checkbox relative">
      <input
        className='absolute opacity-0 cursor-pointer h-0 w-0'
        disabled={disable}
        ref={inputRef}
        type="checkbox"
        onClick={handleClick}
      />
      <span className="checkmark absolute top-0 left-0 h-[16px] w-[16px] bg-neutral-white border-[1px] border-solid border-neutral-border"></span>
      {name}
    </label>
  );
};
