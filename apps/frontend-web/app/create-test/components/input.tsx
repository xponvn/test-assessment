"use client"
import clsx from 'clsx';
import React from 'react'
import { Controller } from 'react-hook-form';

export type InputProps = {
  placeholder?: string;
  required?: boolean;
  label?: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  className?: string;
}

export default function Input({
  name,
  placeholder,
  required,
  label,
  control,
  className
}: InputProps) {

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
          <div className={clsx("flex flex-col w-full", className)}>
            <label
              htmlFor={name}
              className="text-neutral-text-primary text-15 leading-24 mb-1"
            >{required && <span className="mr-1 text-error-base inline-block">*</span>}{label}</label>
            <input
              {...field}
              placeholder={placeholder}
              className={clsx("border border-solid py-[5px] px-3 outline-none text-15 leading-24 text-neutral-text-primary", {
                "border-error-base": errorMss,
                "border-neutral-border": !errorMss
              })}
            />
            {errorMss && <p className="mt-1 text-error-base">{errorMss}</p>}
          </div>
        );
      }}
    />
  )
}
