import { Navigation } from '@test-assessment/ui-components';
import { HeaderNavigationProps } from '../types';
import Image from 'next/image';
import { Notification } from '../images';
import { Profile } from './profile';

export const HeaderNavigation = (props: HeaderNavigationProps) => {
  const { logoUrl, navigation, profile, className } = props;
  const styles = useStyles();

  return (
    <div className={`${styles.root} ${className}`}>
      <div className={`${styles.logo}`}>
        <Image src={logoUrl} alt={''} />
      </div>
      <Navigation {...navigation} />
      <div className={`${styles.profile}`}>
        <Image src={Notification} alt={''} />
        <span className={`${styles.separate}`}>|</span>
        <Profile {...profile} />
      </div>
    </div>
  );
};

const useStyles = () => {
  return {
    root: `flex justify-between`,
    logo: `flex items-center`,
    profile: `flex items-center`,
    separate: `mx-4 text-neutral-placeholder`,
  };
};
