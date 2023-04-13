"use client"
import clsx from 'clsx';
import React from 'react'
import { Controller } from 'react-hook-form';

export type RadioButtonGroupOption = { label: string, value: string }
export type RadioButtonGroupProps = {
  required?: boolean;
  label?: string;
  name: string;
  options: RadioButtonGroupOption[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  className?: string;
}

export default function RadioButtonGroup({
  name,
  required,
  label,
  control,
  options,
  className
}: RadioButtonGroupProps) {
  console.log("control:", control)
  return (
    <div className={clsx("flex flex-col w-full", className)}>
      <p
        className="text-neutral-text-primary text-13 leading-20 mb-1"
      >{required && <span className="mr-1 text-error-base inline-block">*</span>}{label}</p>
      <div className="grid grid-cols-3 mt-[10px] gap-2">

        {options.map((item, index) => {
          return <Controller
            key={index}
            name={name}
            control={control}
            rules={{ required: true }}
            render={({ field, formState: { errors } }) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const errorField: any = errors;
              const errorMss = errorField[`${name}`]?.message;
              return (<>
                <div key={index} className="flex items-center">
                  <input hidden checked={field?.value === item.value} className="radio-input cursor-pointer" {...field} type="radio" id={`${name}_${index}`} value={item.value} />
                  <label htmlFor={`${name}_${index}`} className="radio-input-temp border border-solid border-neutral-border w-4 h-4 rounded-full flex items-center justify-center">
                    <div className="radio-input-circle w-2 h-2 rounded-full"></div>
                  </label>
                  <label className="cursor-pointer inline-block text-neutral-text-primary text-13 leading-20 ml-2" htmlFor={`${name}_${index}`}>{item.label}</label>
                </div>
                {errorMss && <p className="mt-1 text-error-base">{errorMss}</p>}
              </>);
            }} />
        })}
      </div >
    </div >
  )

}
