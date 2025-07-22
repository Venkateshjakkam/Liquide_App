import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [activeScreen, setActiveScreen] = useState('Holdings');
  const [orderPad, setOrderPad] = useState({ open: false, type: null, stock: null });

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        activeScreen,
        setActiveScreen,
        orderPad,
        setOrderPad,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
