import * as React from 'react';
import { Card, Image, Icon, Popup } from 'semantic-ui-react';
import { IUser } from '../Interfaces';

export interface IInfluencerCardProps extends IUser {
}

export default class InfluencerCard extends React.Component<IInfluencerCardProps> {
    render() {
        return (
            <Card fluid>
                <Image src={this.props.avatar_url} />
                <Card.Content>
                    <Card.Header>
                        <Popup
                            trigger={
                                <Icon name='check circle' />
                            }
                            content='Verified User'
                            position='bottom left'
                        />
                        <span>{this.props.name}</span>
                    </Card.Header>
                    <Card.Meta>{this.props.title}</Card.Meta>
                </Card.Content>
                <Card.Content>
                    <span>
                        more info coming soon
                    </span>
                </Card.Content>
            </Card>
        );
    }
}
