import type { Meta } from '@storybook/react';
import { CheckBox as CheckBoxComponent } from '.';
import { mockCheckBoxProps } from './mock';

const Story: Meta<typeof CheckBoxComponent> = {
  title: 'Components / Checkbox',
  component: CheckBoxComponent,
};
export default Story;

export const Button = () => (
  <CheckBoxComponent {...mockCheckBoxProps}/>
);

