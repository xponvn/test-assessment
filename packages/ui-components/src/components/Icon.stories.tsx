import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import { UIProvider } from '@test-assessment/ui-theme';
import themeToken from '@test-assessment/ui-theme/theme-token/frontend-web.json';

const meta: Meta<typeof Icon> = {
  title: 'Icon',
  component: Icon,
  // decorators: [
  //   (Story) => (
  //     <UIProvider config={themeToken.variants}>
  //       <div style={{ margin: '3em' }}>
  //         {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
  //         <Story />
  //       </div>
  //     </UIProvider>
  //   ),
  // ],
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const ArrowDown: Story = {
  render: () => (
    <Icon
      name="arrowDown"
      width={24}
      height={24}
      color="text-neutral-placeholder"
    />
  ),
};
