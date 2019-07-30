import * as React from 'react';
import { Segment, Label, Card, Message, Placeholder } from 'semantic-ui-react';

export interface IInfluencerEventsProps {
    upcomingEvents: any,
    loading: boolean
}

export const InfluencerEvents: React.FC<IInfluencerEventsProps> = (props) => (
    <Segment>
        <Label attached='top' content='Upcoming Events' />
        {
            props.loading ?
                <Placeholder>
                    <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Header>
                </Placeholder>
                :
                // If not loading, check length.
                props.upcomingEvents.length === 0
                    ?
                    <Message content='This influencer does not have any events scheduled yet.' />
                    :
                    <Card.Group itemsPerRow={3} stackable>
                        {

                            props.upcomingEvents.map((event: any) => {
                                return (
                                    <Card
                                        key={event.id}
                                        style={{ marginTop: '-0.1rem' }}
                                    // onClick={() => this.props.history.push('/' + this.props.match.params.userid + '/event/' + event.id + '/register')}
                                    >
                                        <Card.Content>
                                            <Card.Header>{event.title}</Card.Header>
                                            <Card.Meta>{event.date}</Card.Meta>
                                        </Card.Content>
                                    </Card>
                                )
                            })
                        }
                    </Card.Group>
        }
        {/* <Message content="This user hasn't planned any events." warning /> */}
    </Segment>
);
