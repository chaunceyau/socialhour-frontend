import Home from './views/Home';
import InfluencerLanding from './views/Influencer';
import SignInScreen from './views/Auth/SignIn';
import Logout from './views/Auth/Logout';
import CreateInfluencer from './components/admin/CreateInfluencer';
import PrivacyPolicy from './views/TermsOfService/PrivacyPolicy';
import TermsAndConditions from './views/TermsOfService/TermsAndConditions';
import Chron from './components/Chron';

export const COLOR_BACKGROUND_GREY = "#e6ecf0"
export const PRIMARY_COLOR = "#F15642"

export const ROUTE_CONFIG = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/chron',
        component: Chron
    },
    {
        path: '/in/:influencerID',
        component: InfluencerLanding,
    },
    {
        path: '/auth/signin',
        component: SignInScreen
    },
    {
        path: '/auth/logout',
        component: Logout
    },
    {
        path: '/create-in',
        component: CreateInfluencer
    },
    {
        path: '/tos',
        component: TermsAndConditions
    },
    {
        path: '/privacy',
        component: PrivacyPolicy
    }
]