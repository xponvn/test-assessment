import { NavigationProps } from '@test-assessment/ui-components';

export type HeaderProps = {
  headerNavigation: HeaderNavigationProps;
  headerSearch: HeaderSearchProps;
  className?: string;
};

export type HeaderNavigationProps = {
  logoUrl: string;
  navigation: NavigationProps;
  profile: ProfileProps;
  className?: string;
};

export type HeaderSearchProps = {
  title: string;
  searchPlaceholder: string;
  primaryButton: ButtonInfo;
  secondaryButton: ButtonInfo;
  thirdButton?: ButtonInfo;
  score?: number;
};

export type ProfileProps = {
  name: string;
  image: string;
};

export type ButtonInfo = {
  text: string;
  onClick: () => void;
};