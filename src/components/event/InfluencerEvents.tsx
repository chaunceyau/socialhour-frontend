import * as React from 'react';
import { Segment, Label, Card } from 'semantic-ui-react';

export interface IInfluencerEventsProps {
    upcomingEvents: any
}

export default class InfluencerEvents extends React.Component<IInfluencerEventsProps> {
    render() {
        return (
            <Segment>
                <Label attached='top' content='Upcoming Events' />
                <Card.Group itemsPerRow={3} stackable>
                    {UPCOMING_EVENTS.map(event => {
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
                    })}
                </Card.Group>
                {/* <Message content="This user hasn't planned any events." warning /> */}
            </Segment>
        );
    }
}



const UPCOMING_EVENTS = [
    {
        id: 'f93j4m9f432',
        title: 'Meet and Greet',
        date: 'July 8, 2019'
    },
    {
        id: '43f34jcwkc',
        title: 'Meet and Greet 2',
        date: 'July 20, 2019'
    }
]