import { ActionIcon, Tooltip } from '@mantine/core';
import { IconTriangleFilled } from '@tabler/icons-react';
import cx from 'clsx';
import classes from './SideMenuCollapse.module.css';

export default function SideMenuCollpase({
  toggleMenu,
  isMenuCollapsed,
}: {
  toggleMenu: () => void;
  isMenuCollapsed: boolean;
}) {
  return (
    <Tooltip
      position='bottom'
      withArrow
      label={!isMenuCollapsed ? 'Expand' : 'Collapse'}
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
