import * as React from 'react';
import { UpcomingEvents, TrendingFanMail, PageViewWrapper } from '../../components';

const LandingPage: React.FC = () => (
    <PageViewWrapper pageType='fan'>
        <TrendingFanMail />
        <UpcomingEvents />
    </PageViewWrapper>
);

export default LandingPage