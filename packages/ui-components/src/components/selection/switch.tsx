import { useState } from 'react';
export interface SwitchProps {
    checked: boolean;
    onChange?: (checked: boolean) => void;
  }
export const Switch = (props:SwitchProps ) => {
    const { checked, onChange } = props
  const [toggle, setToggle] = useState(checked);
  const toggleClass = ' transform translate-x-5';
  const onToggle = ()=>{
    const isToggle = !toggle;
    setToggle(isToggle);
    if(onChange) onChange(isToggle)

  }
  return (
    <div
      className={
        'w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ' +
        (toggle ? 'bg-primary-clicked' : 'bg-neutral-divider')
      }
      onClick={onToggle}
    >
      <div
        className={
          'bg-white h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out' +
          (toggle && toggleClass)
        }
      ></div>
    </div>
  );
};
