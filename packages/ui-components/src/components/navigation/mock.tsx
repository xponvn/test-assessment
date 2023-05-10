import { NavigationProps } from './types';

export const mockNavigationProps: NavigationProps = {
  menuItems: [
    {
      title: 'Test Management',
      url: '/test-management',
    },
    {
      title: 'Candidate',
      url: '/candidate',
    },
    {
      title: 'Stats',
      url: '/stats',
    },
  ],
  currentPathname: '/test-management',
};
