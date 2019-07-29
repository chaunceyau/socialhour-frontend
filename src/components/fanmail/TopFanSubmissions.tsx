import * as React from 'react';
import { Segment, Label, Message, Button, Card, Image, Icon } from 'semantic-ui-react';
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { IFanMail } from '../../Interfaces';
import { PRIMARY_COLOR } from '../../Config';

export interface ITopFanSubmissionsProps extends RouteComponentProps {
    fanSubmissions: IFanMail[],
    influencerID: string
}

class TopFanSubmissions extends React.Component<ITopFanSubmissionsProps> {
    render() {
        return (
            <Segment>
                <Label
                    attached='top'
                    content='Fan Submissions'
                />
                {
                    this.props.fanSubmissions.length > 0 ?
                        <Card.Group itemsPerRow={3}>
                            {
                                this.props.fanSubmissions.map((mail: IFanMail) => (
                                    <Card
                                        key={mail.id}
                                        onClick={() => this.props.history.push(`/in/${this.props.influencerID}/submission/${mail.id}`)}
                                    >
                                        <Image src={require('../../assets/placeholder.png')} />
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
                            content="This user doesn't have any fanmail. Be the first to leave them a video!"
                        />
                }
                {
                    this.props.fanSubmissions.length > 0 && <br />
                }
                <Button
                    fluid
                    content='Submit Fanmail'
                    style={{ color: 'white', backgroundColor: PRIMARY_COLOR }}
                    onClick={() => this.props.history.push(`/in/${this.props.influencerID}/send`)}
                />
            </Segment>
        );
    }
}


export default withRouter(TopFanSubmissions) 