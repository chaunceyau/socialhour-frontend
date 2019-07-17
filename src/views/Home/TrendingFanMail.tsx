import * as React from 'react';
import { Segment, Label, Card, Image, Icon, Button } from 'semantic-ui-react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost'
import ProtectedScreen from '../Auth/ProtectedScreen';

export interface ITrendingFanMailProps extends RouteComponentProps {
}

const QUERY_TRENDING_INFLUENCERS = gql`
    query QUERY_TRENDING_INFLUENCERS {
        influencers(first: 5) {
            id
            name
            title
            avatar_url
        }
    }
`

class TrendingFanMail extends React.Component<ITrendingFanMailProps> {
    render() {
        return (
            <Segment>
                <Label attached='top' content='Trending Fan Inboxes' />
                <Card.Group stackable itemsPerRow={5}>
                    <Query query={QUERY_TRENDING_INFLUENCERS} variables={{ influencerID: "" }}>
                        {({ loading, error, data }: { loading: any, error?: any, data: any }) => {
                            if (loading || error)
                            return <span>F(J$Ff49kfo3m34omf343</span>
                                if (data) {
                                    const { influencers } = data
                                    return influencers.map((influencer: any) => (
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
                        }}
                    </Query>
                </Card.Group>
            </Segment>
        );
    }
}

export default withRouter(TrendingFanMail)
