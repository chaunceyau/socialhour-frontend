import * as React from 'react';
import UpcomingEvents from './UpcomingEvents';
import TrendingFanMail from './TrendingFanMail';

const Home: React.FC = () => (
    <React.Fragment>
        <TrendingFanMail />
        <UpcomingEvents />
    </React.Fragment>
);

export default Home