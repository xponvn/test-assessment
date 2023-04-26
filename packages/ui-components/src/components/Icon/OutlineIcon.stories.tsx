import type { Meta, StoryObj } from '@storybook/react';
import { Icon, getIconNames } from '.';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon/Outline Icon',
  component: Icon,
  argTypes: {
    name: {
      options: getIconNames('stroke'),
      control: { type: 'select' },
    },
    width: {
      control: { type: 'number' },
    },
    height: {
      control: { type: 'number' },
    },
    viewBox: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const OutlineIcon: Story = {
  args: {
    name: 'arrowDown',
    width: 24,
    height: 24,
    color: 'text-neutral-placeholder',
  },
};
