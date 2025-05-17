import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MAIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SERVICE_ROUTE, APPOINTMENT_ROUTE } from '../utils/consts';
import MainPage from '../pages/MainPage';
import Auth from '../pages/Auth';
import ServicePage from '../pages/ServicePage';
import AppointmentPage from '../pages/AppointmentPage';
import { Context } from '../context';

const AppRouter = () => {
    const { user } = useContext(Context);

    return (
        <Routes>
            <Route path={MAIN_ROUTE} element={<MainPage />} />
            <Route path={SERVICE_ROUTE} element={<ServicePage />} />
            <Route path={APPOINTMENT_ROUTE} element={
                user.isAuth ? <AppointmentPage /> : <Navigate to={LOGIN_ROUTE} />
            } />
            <Route path={LOGIN_ROUTE} element={
                user.isAuth ? <Navigate to={MAIN_ROUTE} /> : <Auth />
            } />
            <Route path={REGISTRATION_ROUTE} element={
                user.isAuth ? <Navigate to={MAIN_ROUTE} /> : <Auth />
            } />
            <Route path="*" element={<Navigate to={MAIN_ROUTE} />} />
        </Routes>
    );
};

export default AppRouter;
