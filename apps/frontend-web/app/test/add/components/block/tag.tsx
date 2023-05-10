import clsx from 'clsx'
import React, { ReactNode } from 'react'

export type TagProps = {
  type?: "error" | "pending" | "success" | "info" | "default",
  children?: string | JSX.Element | ReactNode
}
export default function Tag({ type = "default", children }: TagProps) {
  return (
    <div className={clsx("py-1 px-2 font-medium text-12 leading-4 capitalize w-fit", {
      "bg-neutral-divider text-neutral-text-primary": type === "default",
      "bg-success-base text-neutral-text-primary": type === "success",
      "bg-error-base text-neutral-white": type === "error",
      "bg-pending-base text-neutral-white": type === "pending",
      "bg-primary-base text-neutral-text-primary": type === "info",
    })}>
      {children}
    </div>
  )
}
