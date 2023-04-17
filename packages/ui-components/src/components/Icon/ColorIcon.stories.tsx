import type { Meta, StoryObj } from '@storybook/react';
import { Icon, getIconNames } from '.';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon/Color Icon',
  component: Icon,
  argTypes: {
    name: {
      options: getIconNames(),
      control: { type: 'select' },
    },
    width: {
      control: { type: 'number' },
    },
    height: {
      control: { type: 'number' },
    },
    viewBox: {
      options: ['0 0 24 24', '0 0 32 24'],
      control: false,
    },
    color: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const SquareIcon: Story = {
  args: {
    name: 'gift',
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
  },
};

export const RectangleIcon: Story = {
  args: {
    name: 'masterCard',
    width: 32,
    height: 24,
    viewBox: '0 0 32 24',
  },
};
