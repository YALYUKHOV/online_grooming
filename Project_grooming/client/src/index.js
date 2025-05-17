import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import ServiceStore from './store/ServiceStore';
import { Context } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Context.Provider value={{
    user: new UserStore(),
    service: new ServiceStore()
  }}>
    <App />
  </Context.Provider>
);
