import { HeaderNavigation } from './components/headerNavigation';
import { HeaderProps } from './types';

export const Header = (props: HeaderProps) => {
  const { headerNavigation, headerSearch } = props;

  return (
    <div>
      <HeaderNavigation {...headerNavigation} />
      <div></div>
    </div>
  );
};
