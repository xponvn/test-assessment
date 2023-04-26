import React from 'react'
import { IconProps } from '..'
import clsx from 'clsx'

export default function Edit({ className, transform }: IconProps) {
  return (
    <svg className={clsx(className, 'w-6', 'w-6')}
      transform={transform} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M4.48544 17.0245L8.16176 16.2892L17.3358 7.1152C18.1168 6.33415 18.1168 5.06782 17.3358 4.28677L16.6348 3.58579C15.8538 2.80474 14.5874 2.80474 13.8064 3.58579L4.63235 12.7598L3.89709 16.4361C3.82711 16.786 4.13558 17.0945 4.48544 17.0245ZM3.75 19.0124C3.33579 19.0124 3 19.3482 3 19.7624C3 20.1766 3.33579 20.5124 3.75 20.5124H20.1136C20.5279 20.5124 20.8636 20.1766 20.8636 19.7624C20.8636 19.3482 20.5279 19.0124 20.1136 19.0124H3.75Z" fill="currentColor" />
      <path d="M12.6592 5.0354L15.9319 8.30813" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
