"use client"
import clsx from 'clsx';
import React from 'react'
import { Controller } from 'react-hook-form';

export type RadioButtonOption = { label: string, value: string }
export type RadioButtonProps = {
  required?: boolean;
  label?: string;
  name: string;
  item: RadioButtonOption
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  className?: string;
}

export default function RadioButton({
  name,
  required,
  label,
  control,
  item,
  className
}: RadioButtonProps) {
  return (
    <div className={clsx("flex flex-col w-full", className)}>
      {label && <p
        className="text-neutral-text-primary text-13 leading-20 mb-1"
      >{required && <span className="mr-1 text-error-base inline-block">*</span>}{label}</p>}
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field, formState: { errors } }) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const errorField: any = errors;
          const errorMss = errorField[`${name}`]?.message;
          
          return (<>
            <div className="flex items-center">
              <input hidden checked={String(field?.value) === String(item.value)} className="radio-input cursor-pointer" {...field} type="radio" id={`${name}`} value={item.value} />
              <label htmlFor={`${name}`} className="radio-input-temp border border-solid border-neutral-border w-4 h-4 rounded-full flex items-center justify-center">
                <div className="radio-input-circle w-2 h-2 rounded-full"></div>
              </label>
              <label className="cursor-pointer inline-block text-neutral-text-primary text-13 leading-20 ml-2" htmlFor={`${name}`}>{item.label}</label>
            </div>
            {errorMss && <p className="mt-1 text-error-base">{errorMss}</p>}
          </>);
        }} />
    </div >
  )

}
