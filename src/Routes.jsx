import React from 'react'
import { Switch, Route } from 'react-router';

import Home from './views/Home';
import InfluencerLanding from './views/Influencer';
import SignInScreen from './views/Auth/SignIn';
import Logout from './views/Auth/Logout';
import CreateInfluencer from './components/admin/CreateInfluencer';
import PrivacyPolicy from './views/TermsOfService/PrivacyPolicy';
import TermsAndConditions from './views/TermsOfService/TermsAndConditions';
// import Chron from './components/Chron';

const ROUTE_CONFIG = [
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

const Routes = () => (
    <Switch>
        {
            ROUTE_CONFIG.map((route, index) => (
                <Route key={index} {...route} />
            ))
        }
    </Switch>
)

export default Routes


