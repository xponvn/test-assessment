import type { Meta } from '@storybook/react';
import { Header as HeaderComponent } from './header';
import { mockHeaderProps } from './mock';

const Story: Meta<typeof HeaderComponent> = {
  title: 'Components / Header',
  component: HeaderComponent,
};
export default Story;

export const Header = () => (
  <HeaderComponent {...mockHeaderProps}></HeaderComponent>
);
