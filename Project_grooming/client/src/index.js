import React, { createContext } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import ServiceStore from './store/ServiceStore';

export const Context = createContext(null);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    service: new ServiceStore()

  }}>
    <App />
  </Context.Provider>
);
