"use client"
import clsx from 'clsx';
import React from 'react'
import { Controller } from 'react-hook-form';
import { RenderIcon } from '../icons';

export type CheckboxOption = { label: string, value: string }
export type CheckboxProps = {
  required?: boolean;
  label?: string;
  name: string;
  groupName?: string;
  item: CheckboxOption
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  className?: string;
}

export default function Checkbox({
  name,
  groupName,
  required,
  label,
  control,
  item,
  className
}: CheckboxProps) {
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
              <input hidden checked={String(field?.value) === String(item.value)} className="checkbox-input cursor-pointer" {...field} type="checkbox" id={name} name={groupName} value={item.value} />
              <label htmlFor={name} className="checkbox-input-term border border-solid border-neutral-border w-4 h-4 flex items-center justify-center bg-success rounded-[2px]">
                <RenderIcon name="check" className="checkbox-input-icon text-white" />
              </label>
              <label className="cursor-pointer inline-block text-neutral-text-primary text-13 leading-20 ml-2" htmlFor={name}>{item.label}</label>
            </div>
            {errorMss && <p className="mt-1 text-error-base">{errorMss}</p>}
          </>);
        }} />
    </div >
  )

}
