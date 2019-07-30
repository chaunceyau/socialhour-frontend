import * as React from 'react';
import { Segment, Label, Card } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost'
import QueryError from './QueryError';
import { InfluencerCard } from '.';
import { LoadInfluencerCard } from './LoadInfluencerCard';

export interface ISimilarSuggestionsProps {
    influencerID: string
}

export default class SimilarSuggestions extends React.Component<ISimilarSuggestionsProps> {
    render() {
        return (
            <Segment>
                <Label attached='top' content='Similar Suggestions' />
                <Query query={QUERY_SIMILAR_INFLUENCERS} variables={{ currentInfluencerID: this.props.influencerID }}>
                    {({ loading, error, data }: { loading: any, error?: any, data: any }) => {
                        // LOADING
                        if (loading)
                            return (
                                <Card.Group itemsPerRow={5}>
                                    {[...Array(5)].map((value, index) => <LoadInfluencerCard key={index} />)}
                                </Card.Group>
                            )
                        // ERROR
                        if (error)
                            return <QueryError />
                        // DATA SUCCESS
                        if (data) {
                            const { influencers } = data
                            return (
                                <Card.Group itemsPerRow={5}>
                                    {
                                        influencers.map(({ id, name, title, avatar_url }: any) => (
                                            <InfluencerCard key={id} id={id} name={name} title={title} avatar_url={avatar_url} />
                                        ))
                                    }
                                </Card.Group>
                            )
                        }
                    }}
                </Query>

            </Segment>
        );
    }
}

const QUERY_SIMILAR_INFLUENCERS = gql`
    query QUERY_SIMILAR_INFLUENCERS($currentInfluencerID: ID!) {
        influencers (first: 5, where:{ id_not: $currentInfluencerID }) {
            id
            name
            title
            avatar_url
        }
    }
`