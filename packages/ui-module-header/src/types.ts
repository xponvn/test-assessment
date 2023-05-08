import { NavigationProps } from '@test-assessment/ui-components';

export type HeaderProps = {
  headerNavigation: HeaderNavigationProps;
  headerSearch: HeaderSearchProps;
};

export type HeaderNavigationProps = {
  logoUrl: string;
  navigation: NavigationProps;
};
export type HeaderSearchProps = {
  title: string;
};
