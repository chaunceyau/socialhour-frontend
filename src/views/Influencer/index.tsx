import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import { withRouter, RouteComponentProps, Route } from 'react-router';
import { Query } from 'react-apollo'
import { gql } from "apollo-boost"
import { Helmet } from 'react-helmet'
//
import {
    FanSubmissionVideo, SimilarSuggestions, FanMailForm
} from '../../components';

import InfluencerOverview from './InfluencerOverview';
import InfluencerProfile from '../../components/InfluencerProfile';
import { LoadInfluencerProfile } from '../../components/LoadInfluencerProfile';

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

                    if (error)
                        return <span>error</span>
                    if (data) {
                        const { influencer } = data
                        return (
                            <React.Fragment>
                                {
                                    !loading &&
                                    <Helmet>
                                        <meta charSet="utf-8" />
                                        <title>SocialHour - {influencer.name} Fan Page</title>
                                        <meta property="og:title" content={`${influencer.name} Fanmail`} />
                                        <meta property="og:type" content="website" />
                                        <meta property="og:image:width" content="400" />
                                        <meta property="og:image:height" content="400" />
                                        <meta property="og:url" content={`https://socialhour.tv/in/${influencer.id}`} />
                                        <meta property="og:image" content={influencer.avatar_url} />
                                        <meta property="og:description" content={`Send ${influencer.name} fanmail videos on SocialHour!`} />
                                    </Helmet>
                                }

                                <Grid style={{ paddingTop: '1rem' }} stackable>
                                    <Grid.Row columns={2}>
                                        <Grid.Column width={5}>
                                            {
                                                loading ?
                                                    <LoadInfluencerProfile />
                                                    :
                                                    <InfluencerProfile
                                                        id={this.props.match.params.influencerID}
                                                        name={influencer && influencer.name}
                                                        avatar_url={influencer && influencer.avatar_url}
                                                        title={influencer && influencer.title}
                                                    />
                                            }
                                        </Grid.Column>
                                        <Grid.Column width={11}>
                                            <Route
                                                exact
                                                path='/in/:influencerID'
                                                render={
                                                    props => (
                                                        <InfluencerOverview
                                                            {...props}
                                                            loading={loading}
                                                            influencerID={this.props.match.params.influencerID}
                                                            upcomingEvents={influencer && influencer.events}
                                                            fanSubmissions={influencer && influencer.mail}
                                                        />
                                                    )
                                                }
                                            />
                                            <Route
                                                exact
                                                path='/in/:influencerID/send'
                                                render={props => <FanMailForm {...props}
                                                    influencerID={this.props.match.params.influencerID}
                                                />}
                                            />
                                            <Route
                                                exact
                                                path='/in/:influencerID/submission/:videoID'
                                                render={props =>
                                                    <FanSubmissionVideo
                                                        {...props}
                                                        influencerID={this.props.match.params.influencerID}
                                                    />
                                                }
                                            />
                                            {/* <Route
                                                exact
                                                path='/in/:influencerID/event/:eventID'
                                                component={EventInformation}
                                            />
                                            <Route
                                                exact
                                                path='/in/:influencerID/event/:eventID/register'
                                                component={EventRegistration}
                                            /> */}
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <SimilarSuggestions influencerID={influencer ? influencer.id : "none"} />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </React.Fragment>
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
