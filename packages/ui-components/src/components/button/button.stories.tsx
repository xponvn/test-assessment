import type { Meta } from '@storybook/react';
import { Button as ButtonComponent } from './button';
import { mockButtonProps } from './mock';

const Story: Meta<typeof ButtonComponent> = {
  title: 'Components / Button',
  component: ButtonComponent,
};
export default Story;

export const Button = () => (
  <ButtonComponent {...mockButtonProps['button']}>button</ButtonComponent>
);

export const Link = () => (
  <ButtonComponent {...mockButtonProps['link']}>link</ButtonComponent>
);
