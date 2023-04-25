import React from 'react'

export type SelectProps = {
  label: string;
  options: { label: string, value: string }[]
  value?: string;
  onChange: (value: string) => void;
}

export default function Select({
  label,
  options,
  value,
  onChange
}: SelectProps) {
  return (
    <div className="flex items-center">
      <p className="mr-2 font-medium text-13 leading-6 text-neutral-placeholder">{label}:</p>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="select-filter border border-solid border-neutral-border text-neutral-text-primary text-13 leading-6 px-3 py-2 outline-none h-[40px] w-[265.5px] capitalize">
        <option value=""></option>
        {options.map((item, index) => {
          return <option key={index} className="capitalize">{item.label}</option>
        })}
      </select>
    </div>
  )
}
