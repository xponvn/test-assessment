import type { Meta } from '@storybook/react';
import { Input as InputComponent } from './input';

const Story: Meta<typeof InputComponent> = {
  title: 'Components / Input',
  component: InputComponent,
};
export default Story;

export const Text = () => (
  <InputComponent
    placeholder="Please fill in your username"
    label="Username"
    width={400}
  />
);

export const Password = () => (
  <InputComponent
    label="Password"
    placeholder="Enter your password"
    type="password"
  />
);

export const Error = () => (
  <InputComponent
    error="this is sample error"
    value="this has error"
    label="Error"
  />
);
