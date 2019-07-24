import * as React from 'react';
import { Segment, Label, Card, Image, Icon, Button, Message } from 'semantic-ui-react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost'
import { PRIMARY_COLOR } from '../../Config';
import QueryError from '../../components/QueryError';

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
        return (
            <Segment>
                <Label attached='top' content='Trending Fan Inboxes' />
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
                            if (!influencers) return <span></span>
                            return (
                                <React.Fragment>
                                    <Card.Group stackable itemsPerRow={5}>
                                        {
                                            influencers.map((influencer: any) => (
                                                <Card
                                                    key={influencer.id}
                                                    style={{ marginTop: 0 }}
                                                    onClick={() => this.props.history.push('/in/' + influencer.id)}
                                                >
                                                    <Image src={influencer.avatar_url} />
                                                    <Card.Content>
                                                        <Card.Header>{influencer.name}</Card.Header>
                                                        <Card.Meta>{influencer.title}</Card.Meta>
                                                    </Card.Content>
                                                    <Card.Content as={Button}>
                                                        <Icon name='envelope' />
                                                        <span>Submit Fan Mail</span>
                                                    </Card.Content>
                                                </Card>
                                            ))
                                        }
                                    </Card.Group>
                                    <br />
                                    {
                                        this.state.showNoMoreMessage &&
                                        <Message content='There currently are no more influencers to load...' />
                                    }
                                    <Button
                                        fluid
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
