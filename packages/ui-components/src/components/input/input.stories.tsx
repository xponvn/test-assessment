/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta } from '@storybook/react';
import { Input as InputComponent, InputSize } from './input';

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
    block: {
      control: 'boolean',
    },
    error: {
      control: 'text',
    },
    successText: {
      control: 'text',
    },
    infoText: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    // @ts-expect-error ignore props check
    block: false,
    disabled: false,
    size: 'md',
    error: '',
    successText: '',
    infoText: '',
  },
};
export default Story;

export const Text = (props: typeof Story.argTypes) => (
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
