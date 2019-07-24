import * as React from 'react';
import { Button } from 'semantic-ui-react';
import { client } from '..';
import { gql } from 'apollo-boost';

export interface IChronProps {
}

export default class Chron extends React.Component<IChronProps> {
    public render() {
        return (
            <div>
                <Button content='click me'
                    onClick={() => influencers.map(influencer =>
                        client.mutate({
                            mutation: MUTATION_X,
                            variables: {
                                name: influencer.name.toLowerCase(),
                                influencerID: influencer.id
                            }
                        }))} />
            </div>
        );
    }
}
const MUTATION_X = gql`
    mutation Q($name:String!, $influencerID: ID!) {
        createSearchInfluencer(data:{ 
            name: $name,
            influencer: {
                connect: {
                    id: $influencerID
                }
            }
        }) {
            id
        }
    }
`

const influencers = [
    {
        "id": "cjy2dxjy60061097762tx66mt",
        "name": "Nickmercs"
    },
    {
        "id": "cjy2ea08y00c80977bb9evij8",
        "name": "SypherPK"
    },
    {
        "id": "cjy9cibk803x107777xp2mmqx",
        "name": "CourageJD"
    },
    {
        "id": "cjy9ckecf03xs0777ov7w5bmz",
        "name": "Symfuhny"
    },
    {
        "id": "cjy9cl5mi03xy0777v7smjl3e",
        "name": "BrookeAB"
    },
    {
        "id": "cjy9clikc03y30777gig4y5vf",
        "name": "Loeya"
    },
    {
        "id": "cjy9cqjtz03y807776e5r30qs",
        "name": "Tfue"
    },
    {
        "id": "cjy9cs5p703yw0777q72vy7x5",
        "name": "Ninja"
    },
    {
        "id": "cjy9ctmdf03z20777xrd7rn84",
        "name": "Timthetatman"
    },
    {
        "id": "cjy9cz5i203zd0777y177688d",
        "name": "Shroud"
    }
]