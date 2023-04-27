import type { Meta } from '@storybook/react';
import { Dropdown as DropdownComponent } from './dropdown';
import { mockDropdownProps } from './mock';

const Story: Meta<typeof DropdownComponent> = {
  title: 'Components / Dropdown',
  component: DropdownComponent,
};
export default Story;

export const Dropdown = () => (
  <DropdownComponent button={mockDropdownProps.button}>
    {mockDropdownProps.children}
  </DropdownComponent>
);
