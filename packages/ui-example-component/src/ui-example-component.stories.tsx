import type { Meta } from '@storybook/react';
import UiExampleComponent from './ui-example-component';

const Story: Meta<typeof UiExampleComponent> = {
  component: UiExampleComponent,
  title: 'UiExampleComponent',
};
export default Story;

export const Primary = {
  args: {},
};
