import React, { ReactNode } from 'react';

import { AppShell, Box, Group, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import SideMenuCollpase from '../components/sidemenuCollapse';

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  console.log({ mobileOpened, desktopOpened });

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding='md'
    >
      <AppShell.Navbar p='md'>
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt='sm' animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>
        <Group>
          <Box hiddenFrom='sm'>
            <SideMenuCollpase
              isMenuCollapsed={mobileOpened}
              toggleMenu={toggleMobile}
              mobileOpened={mobileOpened}
            />
          </Box>

          <Box visibleFrom='sm'>
            <SideMenuCollpase
              isMenuCollapsed={desktopOpened}
              toggleMenu={toggleDesktop}
              mobileOpened={false}
            />
          </Box>
        </Group>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default DashboardLayout;
