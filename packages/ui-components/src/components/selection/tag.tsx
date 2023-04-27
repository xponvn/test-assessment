import * as React from 'react';
import clsx from 'clsx';

export type TagStatus = 'published' | 'draft' | 'tag';
export interface TagProps {
  status: TagStatus;
  text: string;
  className?: string
  
}
export const Tag = (props: TagProps) => {
  const { status, text, className='' } = props;

  const useStatus = (status: TagStatus) => {
    switch (status) {
      case 'published':
        return {
          border: 'border-[1px] border-solid border-success-base',
          bg: 'bg-success-bg',
          text: 'text-success-border',
        };
      case 'draft':
        return {
          border: 'border-[1px] border-solid border-neutral-border',
          bg: 'bg-neutral-bg',
          text: 'text-neutral-placeholder',
        };
      case 'tag':
        return {
          border: '',
          bg: 'bg-neutral-disable',
          text: 'text-neutral-text-primary',
        };
      default:
        return {
          border: '',
          bg: 'bg-neutral-disable',
          text: '',
        };
    }
  };

  const statusClassName = useStatus(status);

  return (
    <div className={clsx('px-2 py-1 w-fit', statusClassName.bg, statusClassName.border, className)}>
      <div className={statusClassName.text}>{text}</div>
    </div>
  );
};
