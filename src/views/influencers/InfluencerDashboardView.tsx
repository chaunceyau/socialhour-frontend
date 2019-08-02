import * as React from 'react';
import { InfluencerDashboard } from '../../components';

interface IInfluencerDashboardViewProps {
}

export default class InfluencerDashboardView extends React.Component<IInfluencerDashboardViewProps> {
    render() {
        return (
            <div>
                <InfluencerDashboard />
            </div>
        );
    }
}
