import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { Context } from './context';
import Navbar from './components/NavBar';
import { colors } from './styles/colors';
import { userAPI } from './http/userAPI';

const App = () => {
  const { user } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          user.logout();
          setIsLoading(false);
          return;
        }

        const response = await userAPI.check();
        console.log('Ответ сервера при проверке авторизации:', response); // Для отладки
        
        if (response.user) {
          user.setUser(response.user);
          user.setIsAuth(true);
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
        } else {
          console.log('Пользователь не найден в ответе'); // Для отладки
          user.logout();
        }
      } catch (e) {
        console.error('Ошибка при проверке авторизации:', e);
        user.logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [user]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
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
  );
};

export default App;