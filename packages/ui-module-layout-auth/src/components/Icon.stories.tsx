import type { Meta, StoryObj } from '@storybook/react';
import { UiModuleLayoutAuth } from './ui-module-layout-auth';
const meta: Meta<typeof UiModuleLayoutAuth> = {
  title: 'AuthComponent',
  component: UiModuleLayoutAuth,
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
type Story = StoryObj<typeof UiModuleLayoutAuth>;

export const AuthLayout: Story = {
  render: () => <UiModuleLayoutAuth />,
};
