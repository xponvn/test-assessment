import type { Meta } from '@storybook/react';
import { Navigation as NavigationComponent } from './navigation';
import { mockNavigationProps } from './mock';

const Story: Meta<typeof NavigationComponent> = {
  title: 'Components / Navigation',
  component: NavigationComponent,
};
export default Story;

export const Navigation = () => (
  <NavigationComponent {...mockNavigationProps}></NavigationComponent>
);
