import { MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/dates/styles.css';

import './globals.css';

import App from './App';
import { Login } from './pages/login';
import { theme } from './theme';
import { Notifications } from '@mantine/notifications';
import MermaidChart from './components/Chart/Chart';

// const newChartCode = `${generateMermaidChartData('Alibaba')}`;

const chartCode = ` 
flowchart TD




    SpaceX[SpaceX] -->|Entity| ElonMusk((Elon Musk))

    Tesla[Tesla] -->|Entity| ElonMusk

    DonaldTrump[Donald Trump] -->|POI| ElonMusk

    ElonMusk -->Dummy1["Freedom of Speech"]
 

classDef big font-size:200px,fill:#fc6b03

class SpaceX big



    classDef green fill:#9f6,stroke:#333,stroke-width:1px;
    classDef green1 fill:#9f6,stroke:#333,stroke-width:1px,padding:10px;
    classDef blue fill:skyblue,stroke:#333,stroke-width:2px,padding:10px;
    class SpaceX,Tesla,DonaldTrump,TwitterX,Alibaba,SunadarPichai green
    class DonaldTrump green1
    class ElonMusk blue
    `;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/chart',
    element: <MermaidChart chart={chartCode} />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Notifications />
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>,
);
