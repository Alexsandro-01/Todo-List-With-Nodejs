import { useState } from 'react';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [state, setState] = useState({});

  const context = {
    state,
    setState,
  };

  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>
  );
}

export default AppProvider;
