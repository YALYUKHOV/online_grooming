import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/NavBar';
import { colors } from './styles/colors';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: colors.primary
        }}>
          <Navbar />
          <div style={{
            flex: 1,
            marginTop: '70px', // Высота навбара
            padding: '20px'
          }}>
            <AppRouter />
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;