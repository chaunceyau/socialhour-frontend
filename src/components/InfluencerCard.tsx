import * as React from 'react';
import { Card, Image, Icon, Popup, Button } from 'semantic-ui-react';
import { IUser } from '../Interfaces';
import { withRouter, RouteComponentProps } from 'react-router';

export interface IInfluencerCardProps extends IUser, RouteComponentProps {
    fanMail?: boolean
}

class InfluencerCard extends React.Component<IInfluencerCardProps> {
    render() {
        if (this.props.fanMail)
            return (
                <Card
                    key={this.props.id}
                    style={{ marginTop: 0 }}
                    onClick={() => this.props.history.push('/in/' + this.props.id)}
                >
                    <Image src={this.props.avatar_url} />
                    <Card.Content>
                        <Card.Header>{this.props.name}</Card.Header>
                        <Card.Meta>{this.props.title}</Card.Meta>
                    </Card.Content>
                    <Card.Content as={Button}>
                        <Icon name='envelope' />
                        <span>Submit Fan Mail</span>
                    </Card.Content>
                </Card>
            )
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


export default withRouter(InfluencerCard)