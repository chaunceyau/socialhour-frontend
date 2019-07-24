import * as React from 'react';
import { Query } from 'react-apollo';
import { Search, SearchResultData, SearchProps, SearchResultProps } from 'semantic-ui-react';
import { gql } from 'apollo-boost'
import { withRouter, RouteComponentProps } from 'react-router';
import { client } from '..';

export interface IInfluencerSearchBarProps extends RouteComponentProps {
}

export interface IInfluencerSearchBarState {
    value: string
    results: any[]
    loading: boolean
}

class InfluencerSearchBar extends React.Component<IInfluencerSearchBarProps, IInfluencerSearchBarState> {

    constructor(props: IInfluencerSearchBarProps) {
        super(props);
        this.state = {
            value: '',
            results: [],
            loading: false
        }

        this.handleSearchChange = this.handleSearchChange.bind(this)
    }

    async handleSearchChange(e: any, { value }: { value?: any }) {
        this.setState({ loading: true })
        await client.query({
            query: QUERY_SEARCH_FOR_INFLUENCERS,
            variables: { searchTerm: value }
        })
            .then(({ data }: any) => {
                const { searchInfluencers } = data

                this.setState({
                    results: searchInfluencers.map((influencer: any) =>
                        ({
                            id: influencer.id,
                            title: influencer.name,
                            image: influencer.avatar_url,
                            description: influencer.title
                        })),
                    loading: false
                })

            })
            .catch((err: any) => {
                console.log('errr', err)
                this.setState({ loading: false })
            })
    }


    render() {

        return (
            <Search
                fluid
                minCharacters={1}
                loading={this.state.loading}
                input={{ fluid: true, placeholder: 'Find your favorite influencer or event...' }}
                style={{ width: '70%', margin: '0 auto' }}
                results={this.state.results}
                onSearchChange={this.handleSearchChange}
                onResultSelect={(event: any, data: SearchProps) => {
                    this.props.history.push(`/in/${data.result.id}`)
                }}
            />
        )
    }
}

const QUERY_SEARCH_FOR_INFLUENCERS = gql`
    query QUERY_SEARCH_FOR_INFLUENCERS($searchTerm: String!) {
        searchInfluencers (searchTerm: $searchTerm) {
            id
            name
            title
            avatar_url
        }
    }
`

export default withRouter(InfluencerSearchBar) 