import { HeaderProps } from './types';
import * as Logo from './images/logo.png';
import * as Avatar from './images/avatar.png';

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
    profile: {
      name: 'Username',
      image: Avatar as unknown as string,
    },
  },
  headerSearch: {
    title: 'Title',
    searchPlaceholder: 'Search by test name or author',
    score: 10,
    primaryButton: {
      text: 'BUTTON',
      onClick: function (): void {
        throw new Error('Function not implemented.');
      },
    },
    secondaryButton: {
      text: 'BUTTON',
      onClick: function (): void {
        throw new Error('Function not implemented.');
      },
    },
  },
};
