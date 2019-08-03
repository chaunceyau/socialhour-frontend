import * as React from 'react';
import { Segment, Label, Card, Image, Message } from 'semantic-ui-react';

export interface IUpcomingEventsProps {
}

const LIVE_EVENTS_RUNNING = false

export default class UpcomingEvents extends React.Component<IUpcomingEventsProps> {
    render() {

        return (
            <Segment>
                <Label attached='top' content='Live Upcoming Events' />
                {
                    LIVE_EVENTS_RUNNING ?
                        <Card.Group stackable itemsPerRow={4}>
                            {
                                upcoming_events.map(event => {
                                    return (
                                        <Card style={{ marginTop: 0 }}>
                                            <Image src={event.user.image_url} />
                                            <Card.Content>
                                                <Card.Header>{event.user.name}</Card.Header>
                                                <Card.Meta>{event.date}</Card.Meta>
                                            </Card.Content>
                                        </Card>
                                    )
                                })
                            }
                        </Card.Group>
                        :
                        <Message>
                            <p>Live events feature coming very soon. Leave your favorite influencer <b>video-based fanmail above.</b></p>
                        </Message>
                }
            </Segment>
        );
    }
}



const upcoming_events = [
    {
        id: 'fdalskm',
        date: 'July 8, 2019',
        user: {
            id: 'dsfm204',
            name: 'Nickmercs',
            image_url: 'https://www.esportsbets.com/wp-content/uploads/2019/05/nickmercs-joins-faze-100-thieves.jpg'
        },
        charity: {
            id: 'f34sadfdsa',
            title: "Children's Mercy Hospital",
            image_url: ''
        }
    },
    {
        id: 'cm439439',
        date: 'July 8, 2019',
        user: {
            id: 'dsfm2f439cs023404',
            name: 'Brother Nature',
            image_url: 'https://cdn.vox-cdn.com/thumbor/P9xO30SDT47qa4p46tsX5H-Mq8Y=/40x0:1160x630/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/55312761/pena_pigeon_squirrels.0.jpg'
        },
        charity: {
            id: 'str9jf3m40',
            title: "The Ocean Cleanup",
            image_url: ''
        }
    },
    {
        id: 'fda434as',
        date: 'July 8, 2019',
        user: {
            id: 'dsfm2023404',
            name: 'Dr. Lupo',
            image_url: 'https://s3.dexerto.com/thumbnails/_thumbnailLarge/90734/drlupo-gives-advice-to-viewers-after-distressing-donation-message.jpg'
        },
        charity: {
            id: 'str9jf3m40',
            title: "St. Jude's",
            image_url: ''
        }
    },
    {
        id: 'f4k349',
        date: 'July 8, 2019',
        user: {
            id: 'dsfm2f439cs023404',
            name: 'Tfue',
            image_url: 'https://livestreamersetups.com/wp-content/uploads/2018/07/tfue.jpg'
        },
        charity: {
            id: 'str9jf3m40',
            title: "St. Jude's",
            image_url: ''
        }
    }
]