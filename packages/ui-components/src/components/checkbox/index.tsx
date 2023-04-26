import * as React from 'react';
import { useState } from 'react';

interface CheckBoxProps {
  label?: string;
  bgColor?: string;
  id: string;
  checked?: boolean;
  disabled?: boolean;
}

export type { CheckBoxProps };

export const CheckBox = React.forwardRef((props: CheckBoxProps, ref) => {

  const { label, bgColor = 'bg-primary-clicked', checked = false, disabled = false, id = 'checkbox'} = props;

  const defaultChecked = checked ? checked : false;

  const [isChecked, setIsChecked] = useState(defaultChecked);
  
  return (
    <div className="flex items-center">  
      <input 
        type="checkbox" 
        id={id} 
        className="h-4 w-4 cursor-pointer opacity-0 absolute peer" 
        checked={isChecked} 
        onChange={() => setIsChecked((prev) => !prev)} 
        disabled={disabled}
      />  
      <div 
        className={`w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2 peer-checked:${bgColor} peer-checked:border-0 border-neutral-border border cursor-pointer`}
      >  
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>  
      <label htmlFor={id} className="select-none text-neutral-text-primary text-13 leading-24 font-medium cursor-pointer">{label}</label>  
  </div>  
  );
});
