export type NavigationProps = {
  menuItems: MenuItem[];
  currentPathname: string;
};

export type MenuItem = {
  title: string;
  url: string;
};
