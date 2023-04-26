import React from 'react'
import { IconProps } from '..'
import clsx from 'clsx'

export default function ChevronDown({ className, transform }: IconProps) {
  return (
    <svg className={clsx(className, 'w-6', 'w-6')}
      transform={transform} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.8101 10H7.85669C7.41005 10 7.16946 10.5267 7.46068 10.867L11.5414 15.6348C11.9582 16.1217 12.7086 16.1217 13.1254 15.6348L17.2061 10.867C17.4973 10.5267 17.2567 10 16.8101 10Z" fill="currentColor" />
    </svg>
  )
}
