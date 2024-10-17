import React, { createContext, ReactNode, useContext, useState } from 'react';

interface AppContextType {
  isMenuCollapsed: boolean;
  toggleMenu: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  const toggleMenu = () => {
    setIsMenuCollapsed((prev) => !prev);
  };

  return (
    <AppContext.Provider value={{ isMenuCollapsed, toggleMenu }}>
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
