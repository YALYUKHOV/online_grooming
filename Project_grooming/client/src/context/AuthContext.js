import React, { createContext, useState, useEffect } from 'react';
import { userAPI } from '../http/userAPI';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await userAPI.check();
                setIsAuth(true);
                setUser(response.user);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await userAPI.login(email, password);
            localStorage.setItem('token', response.token);
            setIsAuth(true);
            setUser(response.user);
            return response;
        } catch (e) {
            throw e;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuth(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            isAuth,
            user,
            loading,
            login,
            logout,
            checkAuth
        }}>
            {children}
        </AuthContext.Provider>
    );
}; 