import * as React from 'react';

interface BaseButtonProps {
  type: 'button' | 'link';
  children: React.ReactNode;
  LeftIcon?: React.ReactNode;
  RightIcon?: React.ReactNode;
  className?: string;
  block?: boolean;
  disabled?: boolean
}

interface NormalButtonProps extends BaseButtonProps {
  type: 'button';
  onClick: () => void;
}

interface LinkButtonProps extends BaseButtonProps {
  type: 'link';
  href: string;
  title: string;
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
}

export type ButtonProps = NormalButtonProps | LinkButtonProps;

// TODO: apply design
const buttonClassName: Record<BaseButtonProps['type'], string> = {
  button:
    'items-center justify-center px-4 py-2 bg-primary-base font-medium font-primary text-13 leading-6 space-x-2',
  link: 'inline-flex items-center justify-center space-x-2 text-primary-base font-normal font-primary text-15 leading-6',
};

export const Button = React.forwardRef((props: ButtonProps, ref) => {
  const { children, type, className = '', LeftIcon, RightIcon, disabled } = props;

  if (type === 'link') {
    return (
      <a
        // @ts-expect-error due to unknown type of ref
        ref={ref}
        className={`${buttonClassName[type]} ${className}`}
        href={props.href}
        title={props.title}
        target={props.target || '_blank'}
      >
        {Boolean(LeftIcon) && LeftIcon}
        <span>{children}</span>
        {Boolean(RightIcon) && RightIcon}
      </a>
    );
  }

  return (
    <button
      // @ts-expect-error due to unknown type of ref
      ref={ref}
      className={`${buttonClassName[type]} ${className} ${
        props.block ? 'w-full flex' : 'inline-flex'
      }`}
      disabled={disabled}
      onClick={props.onClick}
    >
      {Boolean(LeftIcon) && LeftIcon}
      <span>{children}</span>
      {Boolean(RightIcon) && RightIcon}
    </button>
  );
});
