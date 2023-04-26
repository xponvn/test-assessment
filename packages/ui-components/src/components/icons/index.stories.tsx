/* eslint-disable import/no-anonymous-default-export */
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Icon, IconProps } from '.';

export default {
  title: 'Components/Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (
  args: IconProps
) => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: "arrow-left"
};
