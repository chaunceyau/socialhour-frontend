import * as React from 'react';
import { Card, Image, Icon, Popup } from 'semantic-ui-react';
import { IUser } from '../Interfaces';
import { withRouter, RouteComponentProps } from 'react-router';

export interface IInfluencerProfileProps extends IUser, RouteComponentProps {
}

const InfluencerProfile: React.FC<IInfluencerProfileProps> = (props: IInfluencerProfileProps) => (
    <Card fluid>
        <Image src={props.avatar_url} />
        <Card.Content>
            <Card.Header>
                <Popup
                    trigger={
                        <Icon name='check circle' color='blue' />
                    }
                    content='Verified User'
                    position='bottom left'
                />
                <span>{props.name}</span>
            </Card.Header>
            <Card.Meta>{props.title}</Card.Meta>
        </Card.Content>
        <Card.Content>
            <span>
                Bio coming soon...
            </span>
        </Card.Content>
    </Card>
);


export default withRouter(InfluencerProfile)