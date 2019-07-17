import * as React from 'react';
import { InfluencerFanMail, InfluencerEvents } from '../../components'
import { IFanMail, IEvent } from '../../Interfaces';

export interface IInfluencerOverviewProps {
    upcomingEvents: IEvent[],
    fanSubmissions: IFanMail[],
    influencerID: string
}

class InfluencerOverview extends React.Component<IInfluencerOverviewProps> {
    render() {
        return (
            <React.Fragment>
                <InfluencerFanMail fanSubmissions={this.props.fanSubmissions} influencerID={this.props.influencerID} />
                <InfluencerEvents upcomingEvents={this.props.upcomingEvents} />
            </React.Fragment>
        )
    }
}

export default InfluencerOverview
