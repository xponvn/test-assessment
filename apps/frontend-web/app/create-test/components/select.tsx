"use client"
import clsx from 'clsx';
import React from 'react'
import { Controller } from 'react-hook-form';

export type SelectOption = { label: string, value: string }
export type SelectProps = {
  placeholder?: string;
  required?: boolean;
  label?: string;
  name: string;
  options: SelectOption[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
}

export default function Select({
  name,
  placeholder,
  required,
  label,
  control,
  options
}: SelectProps) {

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field, formState: { errors } }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errorField: any = errors;
        const errorMss = errorField[`${name}`]?.message;

        return (
          <div className="flex flex-col w-full">
            <label
              htmlFor={name}
              className="text-neutral-text-primary text-15 leading-24 mb-1"
            >{required && <span className="mr-1 text-error-base inline-block">*</span>}{label}</label>
            <select
              {...field}
              className={clsx("border border-solid py-[5px] px-3 outline-none text-15 leading-24 text-neutral-text-primary min-h-[36px]", {
                "border-error-base": errorMss,
                "border-neutral-border": !errorMss
              })}
            >
              {(placeholder || placeholder.length <= 0) && <option>{placeholder}</option>}
              {options.map((item, index) => {
                return <option value={item.value} key={index}>{item.label}</option>
              })}
            </select>
            {errorMss && <p className="mt-1 text-error-base">{errorMss}</p>}
          </div>
        );
      }}
    />
  )
}
