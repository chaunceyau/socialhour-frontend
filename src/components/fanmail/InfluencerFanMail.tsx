import * as React from 'react';
import { Segment, Label, Message, Button, Card, Image, Icon } from 'semantic-ui-react';
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { IFanMail } from '../../Interfaces';

export interface IInfluencerFanMailProps extends RouteComponentProps {
    fanSubmissions: IFanMail[],
    influencerID: string
}

class InfluencerFanMail extends React.Component<IInfluencerFanMailProps> {
    render() {
        return (
            <Segment>
                <Label
                    attached='top'
                    content='Fan Submissions'
                    color='green'
                />
                {
                    this.props.fanSubmissions.length > 0 ?
                        <Card.Group itemsPerRow={3}>
                            {
                                this.props.fanSubmissions.map((mail: IFanMail) => (
                                    <Card
                                        key={mail.id}
                                        // onClick={() => this.props.history.push(`/${mail.to.id}/send`)}
                                    >
                                        <Image src={mail.video_thumbnail_url} />
                                        <Card.Content>
                                            <Card.Header>{mail.title}</Card.Header>
                                            <Card.Meta>
                                                <Icon name='user circle' />
                                                <span>{mail.from.name}</span>
                                            </Card.Meta>
                                        </Card.Content>
                                    </Card>
                                ))
                            }
                        </Card.Group>
                        :
                        <Message
                            content="This user doesn't have any fan mail. Be the first to leave them a video!"
                            warning
                        />
                }
                <br />
                <Button
                    fluid
                    content='Submit Fan Mail'
                    primary
                    onClick={() => this.props.history.push(`/in/${this.props.influencerID}/send`)}
                />
            </Segment>
        );
    }
}


export default withRouter(InfluencerFanMail) 