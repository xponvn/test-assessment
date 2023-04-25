import React, { useState } from 'react'
import clsx from 'clsx';
import { RenderIcon } from '@test-assessment/ui-components';

type InputSearchProps = {
  onSearch: (value: string) => void;
  className?: string
}

export default function InputSearch({ onSearch, className }: InputSearchProps) {
  const [value, setValue] = useState<string>();

  return (
    <div className={clsx("relative", className)}>
      <input 
        className="py-2 px-3 pr-10 outline-none text-13 leading-6 w-full text-neutral-border"
        placeholder="Search by test name or author"
        style={{ background: "rgba(123, 95, 139, 0.5)" }}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="bg-primary-base absolute top-0 bottom-0 right-0 flex items-center justify-center aspect-square cursor-pointer z-[1]" onClick={() => onSearch(value)}>
        <RenderIcon name="search" />
      </div>
    </div>
  )
}
