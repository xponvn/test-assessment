import Image from 'next/image';
import { ProfileProps } from '../types';
import { Dropdown, Icon } from '@test-assessment/ui-components';
import React from 'react';

export const Profile = (props: ProfileProps) => {
  const { name, image } = props;
  const [open, setOpen] = React.useState(false);
  const styles = useStyles();

  return (
    <Dropdown
      button={
        <div className={`${styles.root}`}>
          <Image src={image} alt={''} />
          <div className={`${styles.name}`}>{name}</div>
          {open ? (
            <Icon name="chevron-up" className={`${styles.iconDropdown}`} />
          ) : (
            <Icon name="chevron-down" className={`${styles.iconDropdown}`} />
          )}
        </div>
      }
      onChange={setOpen}
    >
      <div className={`${styles.dropdownSelect}`}>
        <Icon name="user-profile" className={`${styles.iconDropdownSelect}`} />
        <span className={`${styles.dropdownSelectText}`}>User profile</span>
      </div>
      <div className={`${styles.dropdownSelect}`}>
        <Icon name="logout" className={`${styles.iconDropdownSelect}`} />
        <span className={`${styles.dropdownSelectText}`}>Log out</span>
      </div>
    </Dropdown>
  );
};

const useStyles = () => {
  return {
    root: `flex items-center`,
    name: `ml-2 text-neutral-white`,
    iconDropdown: `text-neutral-border`,
    iconDropdownSelect: `text-neutral-text-secondary`,
    dropdownSelect: `flex items-center p-2 bg-neutral-white hover:bg-neutral-table-header cursor-pointer`,
    dropdownSelectText: `ml-3 text-neutral-text-primary text-13`,
  };
};
