import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import { InfluencerCard } from '../../components';
import { withRouter, RouteComponentProps, Route } from 'react-router';
import { EventRegistration, EventInformation, FanMailForm } from '../../components';
import InfluencerOverview from './InfluencerOverview';
import { Query } from 'react-apollo'
import { gql } from "apollo-boost"
import FanSubmission from '../../components/fanmail/FanSubmission';
import SimilarSuggestions from '../../components/SimilarSuggestions';

export interface IInfluencerLandingProps extends RouteComponentProps<IInfluencerRouteParamProps> {
    routes: RouteComponentProps[]
}

interface IInfluencerLandingState {
}

export interface IInfluencerRouteParamProps {
    influencerID: string
    eventID: string
}

class InfluencerLanding extends React.Component<IInfluencerLandingProps, IInfluencerLandingState> {
    render() {
        return (
            <Query
                query={QUERY_INFLUENCER_EVENTS_AND_MAIL}
                variables={{ influencerID: this.props.match.params.influencerID }}
            >
                {({ loading, error, data }: { loading: any, error?: any, data: any }) => {
                    if (loading)
                        return <span>loading</span>
                    if (error)
                        return <span>error</span>
                    if (data) {
                        const { influencer } = data
                        return (
                            <Grid style={{ paddingTop: '1rem' }} stackable>
                                <Grid.Row columns={2}>
                                    <Grid.Column width={5}>
                                        <InfluencerCard
                                            id={influencer.id}
                                            name={influencer.name}
                                            avatar_url={influencer.avatar_url}
                                            title={influencer.title}
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={11}>
                                        <Route
                                            exact
                                            path='/in/:influencerID'
                                            render={
                                                props => (
                                                    <InfluencerOverview
                                                        {...props}
                                                        influencerID={influencer.id}
                                                        upcomingEvents={influencer.events}
                                                        fanSubmissions={influencer.mail}
                                                    />
                                                )
                                            }
                                        />
                                        <Route exact path='/in/:influencerID/send' render={props => <FanMailForm {...props} influencerID={influencer.id} />} />
                                        <Route exact path='/in/:influencerID/submission/:videoID' render={props => <FanSubmission {...props} influencerID={influencer.id} />} />
                                        <Route exact path='/in/:influencerID/event/:eventID' component={EventInformation} />
                                        <Route exact path='/in/:influencerID/event/:eventID/register' component={EventRegistration} />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <SimilarSuggestions influencerID={influencer.id} />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        )
                    }
                }}
            </Query>
        );
    }
}

export const QUERY_INFLUENCER_EVENTS_AND_MAIL = gql`
    query ($influencerID: ID!) {
        influencer(where: { id: $influencerID }) {
            id
            name
            title
            avatar_url
            mail(first: 3, orderBy: createdAt_DESC) {
                id
                title
                description
                video_url
                video_private
                video_thumbnail_url
                influencer_watched
                from {
                    id
                    name
                    avatar_url
                }
                to {
                    id
                    name
                    avatar_url
                }
            }
            events (first: 3) {
                id
                date
                title
            }
        }
    }
`

export default withRouter(InfluencerLanding)
