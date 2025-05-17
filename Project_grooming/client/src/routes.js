import Admin from './pages/Admin';
import MainPage from './pages/MainPage';
import ServicePage from './pages/ServicePage';
import Auth from './pages/Auth';
import AppointmentPage from './pages/AppointmentPage';
import {ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, SERVICE_ROUTE, REGISTRATION_ROUTE, APPOINTMENT_ROUTE} from './utils/consts';

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: APPOINTMENT_ROUTE,
        Component: AppointmentPage
    }
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: SERVICE_ROUTE,
        Component: ServicePage
    },
    {
        path: SERVICE_ROUTE + '/:id',
        Component: ServicePage
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]


