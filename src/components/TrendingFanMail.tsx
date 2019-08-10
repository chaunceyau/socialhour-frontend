import * as React from 'react';
import { Segment, Label, Card, Image, Icon, Button, Message, Popup } from 'semantic-ui-react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
// 
import { PRIMARY_COLOR } from '../Config';
import { QueryError } from '.';
import { InfluencerCardLoad } from '.';

export interface ITrendingFanMailProps extends RouteComponentProps {
}

export interface ITrendingFanMailState {
    showNoMoreMessage: boolean
}

const QUERY_TRENDING_INFLUENCERS = gql`
    query QUERY_TRENDING_INFLUENCERS($first: Int!, $skip: Int!) {
        influencers(first: $first, skip: $skip) {
            id
            name
            title
            avatar_url
        }
    }
`

class TrendingFanMail extends React.Component<ITrendingFanMailProps, ITrendingFanMailState> {
    state = {
        showNoMoreMessage: false
    }
    render() {
        // const { loading, error, data } = useQuery(QUERY_TRENDING_INFLUENCERS, {
        //     variables: {
        //         first: 10,
        //         skip: 0
        //     }
        // })
        return (
            <Segment>
                <Label attached='top' content='Trending Fanmail Inboxes' as='h1' />
                <Query
                    query={QUERY_TRENDING_INFLUENCERS}
                    variables={{
                        first: 10,
                        skip: 0
                    }}
                >
                    {({ loading, error, data, fetchMore }: { loading: any, error?: any, data: any, fetchMore: any }) => {
                        if (error)
                            return <QueryError />
                        if (data) {
                            const { influencers } = data
                            return (
                                <React.Fragment>
                                    <Card.Group stackable itemsPerRow={5}>
                                        {influencers &&
                                            influencers.map((influencer: any) => (
                                                <Card
                                                    key={influencer.id}
                                                    style={{ marginTop: 0 }}
                                                    onClick={() => this.props.history.push('/in/' + influencer.id)}
                                                >
                                                    {/* Avatar picture cards */}
                                                    <Image src={influencer.avatar_url} alt={influencer.name} />

                                                    {/* Name, etc. */}
                                                    <Card.Content>
                                                        <Card.Header>
                                                            <Popup
                                                                trigger={
                                                                    <Icon name='check circle' color='blue' />
                                                                }
                                                                content='Verified Influencer'
                                                            />
                                                            <span>{influencer.name}</span>
                                                        </Card.Header>
                                                        <Card.Meta>
                                                            <p>{influencer.title}</p>
                                                        </Card.Meta>
                                                    </Card.Content>
                                                    <Card.Content as={Button}>
                                                        <Icon name='envelope' />
                                                        <span>Submit Fanmail</span>
                                                    </Card.Content>
                                                </Card>

                                            ))
                                        }
                                    </Card.Group>
                                    {
                                        loading &&
                                        <Card.Group stackable itemsPerRow={5}>
                                            {[...Array(10)].map((value, index) => <InfluencerCardLoad key={index} />)}
                                        </Card.Group>
                                    }
                                    <br />
                                    {
                                        this.state.showNoMoreMessage &&
                                        <Message content='There currently are no more influencers to load...' />
                                    }
                                    <Button
                                        fluid
                                        loading={loading}
                                        content='Load More Influencers'
                                        inverted
                                        style={{ backgroundColor: PRIMARY_COLOR }}
                                        onClick={() => {
                                            this.setState({ showNoMoreMessage: false })
                                            fetchMore({
                                                variables: {
                                                    first: 10,
                                                    skip: influencers.length
                                                },
                                                updateQuery: (prev: any, { fetchMoreResult }: { fetchMoreResult: any }) => {
                                                    if (!fetchMoreResult) {
                                                        return prev;
                                                    }
                                                    if (fetchMoreResult.influencers.length === 0)
                                                        this.setState({ showNoMoreMessage: true })
                                                    return Object.assign({}, prev, {
                                                        influencers: [...prev.influencers, ...fetchMoreResult.influencers]
                                                    });
                                                }
                                            })
                                        }}
                                    />
                                </React.Fragment>
                            )
                        }
                    }}
                </Query>
            </Segment>
        );
    }
}

export default withRouter(TrendingFanMail)
