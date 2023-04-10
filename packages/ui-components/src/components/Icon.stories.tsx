import type { Meta, StoryObj } from '@storybook/react';
import Icon from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Icon',
  component: Icon,
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const ArrowDown: Story = {
  render: () => (
    <Icon name="arrowDown" width={24} height={24} color="text-[#7B5F8B]" />
  ),
};
