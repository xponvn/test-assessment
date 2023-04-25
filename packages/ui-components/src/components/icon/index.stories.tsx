/* eslint-disable import/no-anonymous-default-export */
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RenderIcon, IconProps } from '.';

export default {
  title: 'Components/Icon',
  component: RenderIcon,
} as ComponentMeta<typeof RenderIcon>;

const Template: ComponentStory<typeof RenderIcon> = (
  args: IconProps
) => <RenderIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: "arrow-left"
};
