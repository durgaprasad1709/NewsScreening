import { Flex } from '@mantine/core';

import Content from './components/content/Content';
import { NavbarSimple } from './components/navbar/NavbarSimple';
import { AppContextProvider } from './contextAPI/AppContext';
import './globals.css';

export default function App() {
  return (
    <AppContextProvider>
      <Flex>
        <NavbarSimple />
        <Content />
      </Flex>
    </AppContextProvider>
  );
}
