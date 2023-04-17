import type { Meta, StoryObj } from '@storybook/react';
import { Icon, getIconNames } from '.';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon/Fill Icon',
  component: Icon,
  argTypes: {
    name: {
      options: getIconNames('fill'),
      control: { type: 'select' },
    },
    width: {
      control: { type: 'number' },
    },
    height: {
      options: [24, 16],
      control: { type: 'number' },
    },
    viewBox: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const FillIcon: Story = {
  args: {
    name: 'deleteCircle',
    width: 24,
    height: 24,
    color: 'text-neutral-placeholder',
  },
};
