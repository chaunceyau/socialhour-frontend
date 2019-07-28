import * as React from 'react';
import SimilarSuggestions from '../../components/SimilarSuggestions';

export interface IInfluencerNoIDProps {
}

export default class InfluencerNoID extends React.Component<IInfluencerNoIDProps> {
    render() {
        return (
            <div>
                <h1>Influencer Fanmail</h1>
                <p>
                    On SocialHour, fans can leave fanmail videos for their favorite influencers. Although this probably isn't the page you were looking for, if you navigate back to the homepage you can find your favorite influencers such as Nickmercs, Gary Vaynerchuk, Ninja, Tfue, and many many others. Leave them a fanmail video and we plan times for them to do live fanmail reading events. We also plan other live events such as charity-raising online meet and greets.
                </p>
                <SimilarSuggestions influencerID="none" />
            </div>
        );
    }
}
