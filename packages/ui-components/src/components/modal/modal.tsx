import React from 'react';
import clsx from 'clsx';
import { Icon } from '../icons';
import { Button } from '../button/button';

export interface ModalProps extends React.PropsWithChildren {
  title: string;
  open?: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onSubmit?: () => void;
  className?: string;
  backdrop?: BackDropType;
  submitText?: string;
  closeText?: string;
}
export enum BackDropType {
  NONE = 'none',
  INTERACTIVE = 'interactive', // close modal when clicking outside
  STATIC = 'static', // do not close modal when clicking outside
}
export const Modal = ({
  open,
  title,
  onClose,
  onSubmit,
  children,
  className,
  submitText = 'Save',
  closeText = 'Cancel',
  onCancel,
  backdrop = BackDropType.INTERACTIVE,
}: ModalProps) => {
  return (
    <div
      className={clsx(
        'absolute top-0 left-0 w-screen h-screen',
        backdrop !== BackDropType.NONE && 'bg-[#373737] bg-opacity-60',
        open ? 'visible' : 'invisible'
      )}
      onClick={() => {
        if (backdrop !== BackDropType.INTERACTIVE) return;
        onClose && onClose();
      }}
    >
      <div
        className={clsx('w-[550px] border-1 bg-white mx-auto mt-16', className)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 flex items-center justify-between border border-neutral-divider">
          <span className="text-neutral-text-primary text-xl leading-6 font-medium">
            {title}
          </span>
          <div className="cursor-pointer w-4 h-4" onClick={onClose}>
            <Icon name="close" />
          </div>
        </div>

        <div className="px-6 py-5">{children}</div>

        <div className="flex items-center justify-end px-6 py-5">
          {onSubmit && (
            <Button className="w-[130px]" type="button" onClick={onSubmit}>
              {submitText}
            </Button>
          )}
          {onCancel && (
            <div className="pl-3">
              <Button className="w-[130px]" type="button" onClick={onCancel}>
                {closeText}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
