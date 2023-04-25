import clsx from 'clsx';
import React from 'react'

type TabFilterProps = {
  options: { label: string, value: string }[];
  active: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function TabFilter({ options, active, onChange, className }: TabFilterProps) {
  return (
    <div className="bg-neutral-bg border border-solid border-neutral-border p-1 w-fit flex items-center max-h-[40px]">
      {options.map((item, index) => {
        return <div key={index} className="flex items-center">
          <div
            onClick={() => onChange(item.value)}
            className={clsx(className, "py-1 px-[30px] cursor-pointer text-13 leading-6 transition-all", {
              "bg-neutral-disable text-neutral-text-primary font-medium": active === item.value,
              "bg-neutral-bg text-neutral-placeholder font-medium": active !== item.value,
            })}
          >
            {item.label}
          </div>
          {index !== options.length - 1 && <span className="w-6 border border-solid border-neutral-disable rotate-90 h-0"></span>}
        </div>
      })}
    </div>
  )
}
