import Admin from './pages/Admin';
import MainPage from './pages/MainPage';
import ServicePage from './pages/ServicePage';
import Auth from './pages/Auth';
import {ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, SERVICE_ROUTE, REGISTRATION_ROUTE} from './utils/consts';

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
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
    },
]


