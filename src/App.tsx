import { Flex, MantineProvider } from '@mantine/core';
import { theme } from './theme';

import '@mantine/charts/styles.css';
import '@mantine/dates/styles.css';

import Content from './components/content/Content';
import { NavbarSimple } from './components/navbar/NavbarSimple';
import { AppContextProvider } from './contextAPI/AppContext';
import './globals.css';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <AppContextProvider>
        <Flex>
          <NavbarSimple />
          <Content />
        </Flex>
      </AppContextProvider>
    </MantineProvider>
  );
}
