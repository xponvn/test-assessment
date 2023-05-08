import { HeaderProps } from './types';
import { Logo } from './images';

export const mockHeaderProps: HeaderProps = {
  headerNavigation: {
    logoUrl: Logo as unknown as string,
    navigation: {
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
          title: 'Candidate',
          url: '/candidate',
        },
      ],
      currentPathname: '/test-management',
    },
  },
  headerSearch: {
    title: 'Title',
  },
};
