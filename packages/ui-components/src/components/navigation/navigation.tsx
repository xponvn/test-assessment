import * as React from 'react';
import { NavigationProps } from './types';
import Link from 'next/link';

export const Navigation = React.forwardRef((props: NavigationProps, ref) => {
  const { menuItems, currentPathname } = props;
  const styles = useStyles();

  return (
    <div className={`${styles.root}`}>
      {menuItems?.map((menuItem) => {
        return (
          <Link
            key={menuItem.url}
            className={`${styles.link(currentPathname === menuItem.url)}`}
            href={menuItem.url}
            data-title={menuItem.title}
          >
            {menuItem.title}
          </Link>
        );
      })}
    </div>
  );
});

const useStyles = () => {
  return {
    root: 'flex bg-neutral-text-primary text-13',
    link: (routeActive: boolean) =>
      `mx-[32px] py-[16px] border-b-2 text-center 
      ${
        routeActive
          ? 'border-primary-base text-neutral-white font-bold'
          : 'border-none text-neutral-disable hover:text-neutral-white hover:font-bold'
      } 
      hover:border-b-2 hover:border-primary-1 
      after:content-[attr(data-title)] after:block after:h-[0px] 
      after:invisible after:font-bold after:overflow-hidden`,
  };
};
