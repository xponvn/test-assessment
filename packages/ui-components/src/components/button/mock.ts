import { ButtonProps } from './button';

export const mockButtonProps: Record<ButtonProps['type'], ButtonProps> = {
  button: {
    type: 'button',
    children: 'button',
    onClick: () => console.log('hello world'),
  },
  link: {
    type: 'link',
    children: 'link',
    href: 'https://github.com/',
    title: 'Github',
  },
};
