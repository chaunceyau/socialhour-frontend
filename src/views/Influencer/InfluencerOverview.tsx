import * as React from 'react';
import { TopFanSubmissions, InfluencerEvents } from '../../components'
import { IFanMail, IEvent } from '../../Interfaces';

export interface IInfluencerOverviewProps {
    upcomingEvents: IEvent[],
    fanSubmissions: IFanMail[],
    influencerID: string,
    loading: boolean
}

const InfluencerOverview: React.FC<IInfluencerOverviewProps> = (props:IInfluencerOverviewProps) => (
    <React.Fragment>
        <TopFanSubmissions loading={props.loading} fanSubmissions={props.fanSubmissions} influencerID={props.influencerID} />
        <InfluencerEvents loading={props.loading} upcomingEvents={props.upcomingEvents} />
    </React.Fragment>
)

export default InfluencerOverview
