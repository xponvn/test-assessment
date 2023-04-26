/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta } from '@storybook/react';
import { Input as InputComponent, InputSize } from './input';
import { Icons } from '../icons';

const Story: Meta<typeof InputComponent> = {
  title: 'Components / Input',
  component: InputComponent,
  argTypes: {
    // @ts-expect-error ignore props check
    size: {
      control: {
        type: 'select',
        options: [InputSize.LARGE, InputSize.MEDIUM, InputSize.SMALL],
      },
    },
    required: { control: 'boolean' },
    fill: { control: 'boolean' },
    error: { control: 'text' },
    successText: { control: 'text' },
    infoText: { control: 'text' },
    disabled: { control: 'boolean' },
    leftIcon: {
      control: {
        type: 'select',
        options: [undefined, ...Object.keys(Icons)],
      },
    },
    rightIcon: {
      control: {
        type: 'select',
        options: [undefined, ...Object.keys(Icons)],
      },
    },
  },
  args: {
    // @ts-expect-error ignore props check
    required: true,
    disabled: false,
    fill: false,
    size: 'md',
    error: '',
    successText: '',
    infoText: '',
  },
};
export default Story;

export const Text = (props: any) => (
  <InputComponent
    label="Label"
    {...props}
    placeholder="Please fill in your username"
  />
);

export const Password = (props: any) => (
  <InputComponent
    {...props}
    label="Password"
    placeholder="Enter your password"
    type="password"
  />
);
