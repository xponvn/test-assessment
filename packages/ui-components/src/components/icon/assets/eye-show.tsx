import React from 'react'
import { IconProps } from '..'
import clsx from 'clsx'

export default function EyeShow({ className, transform }: IconProps) {
  return (
    <svg className={clsx(className, 'w-6', 'w-6')}
      transform={transform} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 9.54545C10.4909 9.54545 9.27273 10.7636 9.27273 12.2727C9.27273 13.7818 10.4909 15 12 15C13.5091 15 14.7273 13.7818 14.7273 12.2727C14.7273 10.7636 13.5091 9.54545 12 9.54545ZM12 16.8182C9.49091 16.8182 7.45455 14.7818 7.45455 12.2727C7.45455 9.76364 9.49091 7.72727 12 7.72727C14.5091 7.72727 16.5455 9.76364 16.5455 12.2727C16.5455 14.7818 14.5091 16.8182 12 16.8182ZM12 5C7.45455 5 3.57273 7.82727 2 11.8182C3.57273 15.8091 7.45455 18.6364 12 18.6364C16.5455 18.6364 20.4273 15.8091 22 11.8182C20.4273 7.82727 16.5455 5 12 5Z" fill="currentColor" />
    </svg>
  )
}
