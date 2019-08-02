import React from 'react'
import { Switch, Route } from 'react-router';

import Home from './views/all/Home';
import InfluencerLandingView from './views/fans/InfluencerLandingView';
import SignInScreen from './views/all/Auth/SignIn';
import Logout from './views/all/Auth/Logout';
import CreateInfluencer from './components/admin/CreateInfluencer';
import PrivacyPolicy from './views/all/Legal/PrivacyPolicy';
import TermsAndConditions from './views/all/Legal/TermsAndConditions';
import InfluencerNoID from './components/InfluencerNoID';
import InfluencerDashboardView from './views/influencers/InfluencerDashboardView';

const ROUTE_CONFIG = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    // influencer 
    {
        path: '/in/:influencerID',
        component: InfluencerLandingView,
    },
    {
        path: '/in',
        component: InfluencerNoID
    },
    // auth
    {
        path: '/auth/signin',
        component: SignInScreen
    },
    {
        path: '/auth/logout',
        component: Logout
    },
    // influencer dashboard
    {
        path: '/influencer',
        component: InfluencerDashboardView
    },
    // 
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


