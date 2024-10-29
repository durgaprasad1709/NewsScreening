import { useContext } from 'react';
import { DashboardContext } from '../contextAPI/DashboardContext';

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      'useDashboardContext must be used within an DashboardContextProvider',
    );
  }
  return context;
};
