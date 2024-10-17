import { ActionIcon, Tooltip } from '@mantine/core';
import { IconTriangleFilled } from '@tabler/icons-react';
import classes from './SideMenuCollapse.module.css';
import cx from 'clsx';

export default function SideMenuCollpase({
  toggleMenu,
  isMenuCollapsed,
  mobileOpened,
}: {
  toggleMenu: () => void;
  isMenuCollapsed: boolean;
  mobileOpened: boolean;
}) {
  console.log('isMenuCollapsed', !isMenuCollapsed);

  console.log('mobileOpened', mobileOpened);

  return (
    <Tooltip
      position='bottom'
      withArrow
      label={!isMenuCollapsed ? 'Expand Search Form' : 'Collapse Search Form'}
    >
      <ActionIcon
        className={cx(classes.actionIcon, {
          [classes.collapsed]: !isMenuCollapsed,
        })}
        onClick={toggleMenu}
        variant='transparent'
        c='premiumDark'
      >
        <IconTriangleFilled size={22} />
      </ActionIcon>
    </Tooltip>
  );
}
