import { Navigation } from '@test-assessment/ui-components';
import { HeaderNavigationProps } from '../types';
import Image from 'next/image';
import { Notification } from '../images';

export const HeaderNavigation = (props: HeaderNavigationProps) => {
  const { logoUrl, navigation } = props;
  const styles = useStyles();

  return (
    <div className={`${styles.root}`}>
      <div className={`${styles.logo}`}>
        <Image src={logoUrl} alt={''} />
      </div>
      <Navigation {...navigation} />
      <div className={`${styles.profile}`}>
        <Image src={Notification} alt={''} />
        <span>|</span>
        Profile
      </div>
    </div>
  );
};

const useStyles = () => {
  return {
    root: `flex justify-between bg-neutral-text-primary`,
    logo: `flex items-center`,
    profile: `flex items-center`,
  };
};
