import clsx from 'clsx';
import React from 'react'

type BreadCrumbProps = {
  options: string[];
  active: string
  onActive: (item: string) => void;
}

export default function BreadCrumb({
  active,
  options,
  onActive
}: BreadCrumbProps) {
  return (
    <div className="flex items-center gap-12">
      {options.map((item, index) => {
        return <div className={clsx("text-13 cursor-pointer leading-6 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-primary-base after:mx-auto after:transition-all", {
          "text-neutral-table-header after:w-full": active === item,
          "text-neutral-border after:w-0": active !== item
        })} key={index} onClick={() => onActive(item)}>{item}</div>
      })}
    </div>
  )
}
