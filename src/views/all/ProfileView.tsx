import React from 'react'
import { PageViewWrapper, Profile } from '../../components';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

interface Props {

}

export default function ProfileView(): Props {
    return (
        <PageViewWrapper pageType='profile'>
            <Query query={QUERY_CURRENT_USER}>
                {}
            </Query>
            <Profile loading={true} />
        </PageViewWrapper>
    )
}


const QUERY_CURRENT_USER = gql`
    query {
        currentUser {
            id
            name
            avatar_url
        }
    }
`