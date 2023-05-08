import * as React from 'react';

interface BaseButtonProps {
  type: 'button' | 'link';
  children: React.ReactNode;
  LeftIcon?: React.ReactNode;
  RightIcon?: React.ReactNode;
  className?: string;
  block?: boolean;
  variant?: 'primary' | 'secondary' | 'display' | 'secondaryDark';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean
  style?: React.CSSProperties
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
    'items-center justify-center px-4 py-2 font-medium font-primary text-13 leading-6 space-x-2',
  link: 'inline-flex items-center justify-center space-x-2 text-primary-base font-normal font-primary text-15 leading-6',
};

const variantClassName: Record<string, string> = {
  display: 'bg-primary-base shadow-[5px_5px_0] shadow-secondary-base',
  primary: 'bg-primary-base',
  secondary:
    'border-[3px] border-solid border-primary-base bg-primary-background',
  secondaryDark: 'border-[3px] border-solid border-primary-base',
};
const sizeClassName: Record<string, string> = {
  small: 'px-2 py-1',
  medium: 'px-4 py-2',
  large: 'px-6 py-3',
};

export const Button = React.forwardRef((props: ButtonProps, ref) => {
  const {
    children,
    type,
    className = '',
    LeftIcon,
    RightIcon,
    variant = 'primary',
    size = 'medium',
    disabled,
    style, // for overwrite tailwind cause cannot do that with className
  } = props;

  if (type === 'link') {
    return (
      <a
        // @ts-expect-error due to unknown type of ref
        ref={ref}
        className={`${buttonClassName[type]} ${className}`}
        href={props.href}
        title={props.title}
        target={props.target || '_blank'}
        style={style}
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
      } ${variantClassName[variant]} ${sizeClassName[size]}`}
      disabled={disabled}
      onClick={props.onClick}
      style={style}
    >
      {Boolean(LeftIcon) && LeftIcon}
      <span>{children}</span>
      {Boolean(RightIcon) && RightIcon}
    </button>
  );
});
