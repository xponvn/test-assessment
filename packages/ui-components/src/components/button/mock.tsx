import { Icon } from '../Icon';
import { ButtonProps } from './button';

export const mockButtonProps: Record<ButtonProps['type'], ButtonProps> = {
  button: {
    type: 'button',
    children: 'button',
    onClick: () => alert('hello world'),
    LeftIcon: <Icon name="caution" width={24} height={24} color="text-error" />,
    RightIcon: (
      <Icon name="caution" width={24} height={24} color="text-error" />
    ),
  },
  link: {
    type: 'link',
    children: 'link',
    href: 'https://github.com/',
    title: 'Github',
    LeftIcon: <Icon name="caution" width={24} height={24} color="text-error" />,
    RightIcon: (
      <Icon name="caution" width={24} height={24} color="text-error" />
    ),
  },
};
