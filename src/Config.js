import Home from './views/Home';
import InfluencerLanding from './views/Influencer';
import SignInScreen from './views/Auth/SignIn';
import Login from './views/Auth/Login';
import Logout from './views/Auth/Logout';

export const COLOR_BACKGROUND_GREY = "#e6ecf0"

export const ROUTE_CONFIG = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/in/:influencerID',
        component: InfluencerLanding,
    },
    {
        path: '/auth/login',
        component: Login
    },
    {
        path: '/auth/signin',
        component: SignInScreen
    },
    {
        path: '/auth/logout',
        component: Logout
    }
]