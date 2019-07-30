import * as React from 'react';
import { Card, Image, Icon, Popup, Button, Placeholder } from 'semantic-ui-react';
import { IUser } from '../Interfaces';
import { withRouter, RouteComponentProps } from 'react-router';

export interface IInfluencerCardProps extends IUser, RouteComponentProps { }

class InfluencerCard extends React.Component<IInfluencerCardProps> {
    render() {
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
                    <span>Submit Fanmail</span>
                </Card.Content>
            </Card>
        )
    }
}


export default withRouter(InfluencerCard)