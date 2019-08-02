import * as React from 'react';
import { Card, Image, Icon, Button } from 'semantic-ui-react';
import { IUser } from '../Interfaces';
import { withRouter, RouteComponentProps } from 'react-router';

export interface IInfluencerCardProps extends IUser, RouteComponentProps { }

const InfluencerCard: React.FC<IInfluencerCardProps> = (props: IInfluencerCardProps) => (
    <Card
        key={props.id}
        style={{ marginTop: 0 }}
        onClick={() => props.history.push('/in/' + props.id)}
    >
        <Image src={props.avatar_url} />
        <Card.Content>
            <Card.Header>{props.name}</Card.Header>
            <Card.Meta>{props.title}</Card.Meta>
        </Card.Content>
        <Card.Content as={Button}>
            <Icon name='envelope' />
            <span>Submit Fanmail</span>
        </Card.Content>
    </Card>
)


export default withRouter(InfluencerCard)