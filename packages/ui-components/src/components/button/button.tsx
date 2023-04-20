import * as React from 'react';

interface BaseButtonProps {
  type: 'button' | 'link';
  children: React.ReactNode;
  LeftIcon?: React.ComponentType<any>;
  RightIcon?: React.ComponentType<any>;
  className?: string;
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
const iconClassName = '';

// TODO: apply design
const buttonClassName: Record<BaseButtonProps['type'], string> = {
  button:
    'px-4 py-2 bg-primary-base font-medium font-primary text-13 leading-6',
  link: 'text-primary-base font-normal font-primary text-15 leading-6',
};

export const Button = React.forwardRef((props: ButtonProps, ref) => {
  const { children, type, className = '', LeftIcon, RightIcon } = props;

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
        {LeftIcon && <LeftIcon className={iconClassName} />}

        {children}

        {RightIcon && <RightIcon className={iconClassName} />}
      </a>
    );
  }

  return (
    <button
      // @ts-expect-error due to unknown type of ref
      ref={ref}
      className={`${buttonClassName[type]} ${className}`}
      onClick={props.onClick}
    >
      {LeftIcon && <LeftIcon className={iconClassName} />}

      {children}

      {RightIcon && <RightIcon className={iconClassName} />}
    </button>
  );
});
