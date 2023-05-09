import { HeaderNavigation } from './components/headerNavigation';
import { HeaderSearch } from './components/headerSearch';
import { HeaderProps } from './types';

export const Header = (props: HeaderProps) => {
  const { headerNavigation, headerSearch, className } = props;
  const styles = useStyles();

  return (
    <div className={`${styles.root} ${className}`}>
      <HeaderNavigation
        {...headerNavigation}
        className={`${styles.headerNavigation}`}
      />
      <HeaderSearch {...headerSearch} />
    </div>
  );
};

const useStyles = () => {
  return {
    root: `bg-neutral-text-primary`,
    headerNavigation: `mb-6`,
  };
};