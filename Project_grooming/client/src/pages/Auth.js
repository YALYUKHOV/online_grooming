import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, MAIN_ROUTE } from '../utils/consts';
import { Context } from '../context';
import { userAPI } from '../http/userAPI';
import './Auth.css';

const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(Context);
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phone: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            let response;
            if (isLogin) {
                response = await userAPI.login(formData.email, formData.password);
                localStorage.setItem('token', response.token);
            } else {
                response = await userAPI.registration(
                    formData.email,
                    formData.password,
                    formData.name,
                    formData.phone
                );
                localStorage.setItem('token', response.token);
            }

            // Получаем информацию о пользователе
            const userInfo = await userAPI.check();
            user.setUser(userInfo.user);
            user.setIsAuth(true);
            navigate(MAIN_ROUTE);
        } catch (e) {
            setError(e.response?.data?.message || 'Произошла ошибка');
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
                {error && <div className="error-message">{error}</div>}
                
                {!isLogin && (
                    <>
                        <div className="form-group">
                            <label htmlFor="name">Имя</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Телефон</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </>
                )}
                
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="auth-button">
                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </button>
            </form>
        </div>
    );
};

export default Auth;
