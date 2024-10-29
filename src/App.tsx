import { Flex } from '@mantine/core';

import Content from './components/content/Content';
import { NavbarSimple } from './components/navbar/NavbarSimple';
import { AppContextProvider } from './contextAPI/AppContext';
import { DashboardContextProvider } from './contextAPI/DashboardContext';

import './globals.css';

export default function App() {
  return (
    <AppContextProvider>
      <DashboardContextProvider>
        <Flex>
          <NavbarSimple />
          <Content />
        </Flex>
      </DashboardContextProvider>
    </AppContextProvider>
  );
}
