import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { MAIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, ADMIN_ROUTE, SERVICE_ROUTE, APPOINTMENT_ROUTE } from '../utils/consts';
import { Context } from '../index';
import './Navbar.css';

const Navbar = () => {
    const { user } = useContext(Context);

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="leftSection">
                    <NavLink to={MAIN_ROUTE} className="logo">
                        PetGroom
                    </NavLink>
                    <NavLink to={SERVICE_ROUTE} className="navButton">
                        Услуги
                    </NavLink>
                </div>

                <div className="rightSection">
                    {user.isAuth ? (
                        <>
                            <NavLink to={APPOINTMENT_ROUTE} className="navButton">
                                Мои записи
                            </NavLink>
                            {user.user.role === 'ADMIN' && (
                                <NavLink to={ADMIN_ROUTE} className="navButton">
                                    Админ панель
                                </NavLink>
                            )}
                            <div className="userContainer">
                                <span className="userName">
                                    {user.user.name}
                                </span>
                                <button 
                                    onClick={logOut}
                                    className="logoutButton"
                                >
                                    Выйти
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <NavLink to={LOGIN_ROUTE} className="loginButton">
                                Войти
                            </NavLink>
                            <NavLink to={REGISTRATION_ROUTE} className="registerButton">
                                Регистрация
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;