import * as React from 'react';
import { Segment, Label, Message, Button, Card } from 'semantic-ui-react';
import { withRouter, RouteComponentProps } from 'react-router-dom'
// 
import { PRIMARY_COLOR } from '../../Config';
import { IFanMail } from '../../Interfaces';
import { FanSubmissionCardLoad, FanSubmissionCard } from '../';

export interface ITopFanSubmissionsProps extends RouteComponentProps {
    fanSubmissions: IFanMail[],
    influencerID: string,
    loading: boolean
}

function renderNoFanMailMessage(influencerID: string) {
    const fake_mail: IFanMail = {
        id: "",
        to: {
            id: influencerID,
            name: 'fmsdal',
            title: 'Video Game Streamer',
            avatar_url: 'https://nyunews.com/wp-content/uploads/2018/02/021218_theme-stranger_samcheng-1-e1518411807488.jpg'
        },
        from: {
            id: '402k',
            name: 'Elijah W.',
            avatar_url: 'fmlsda'
        },
        title: "Glad you're back!",
        description: "not needed",
        video_url: "not needed",
        video_thumbnail_url: "https://i.ytimg.com/vi/SaQ4xx4F52Y/maxresdefault.jpg",
        video_private: false,
        influencer_watched: false
    }
    const fake_mail1: IFanMail = {
        id: "",
        to: {
            id: influencerID,
            name: 'fmsdal',
            title: 'Video Game Streamer',
            avatar_url: 'https://nyunews.com/wp-content/uploads/2018/02/021218_theme-stranger_samcheng-1-e1518411807488.jpg'
        },
        from: {
            id: '402k',
            name: 'Devon K.',
            avatar_url: 'fmlsda'
        },
        title: "Love You Bro",
        description: "not needed",
        video_url: "not needed",
        video_thumbnail_url: "https://thetigertimes.files.wordpress.com/2014/09/garcia.jpg",
        video_private: false,
        influencer_watched: false
    }
    const fake_mail2: IFanMail = {
        id: "",
        to: {
            id: influencerID,
            name: 'fmsdal',
            title: 'Video Game Streamer',
            avatar_url: 'https://nyunews.com/wp-content/uploads/2018/02/021218_theme-stranger_samcheng-1-e1518411807488.jpg'
        },
        from: {
            id: '402k',
            name: 'Elliot M.',
            avatar_url: 'fmlsda'
        },
        title: "Funny Story",
        description: "not needed",
        video_url: "not needed",
        video_thumbnail_url: "https://i.redd.it/1xw0r4hhhqr01.jpg",
        video_private: false,
        influencer_watched: false
    }
    const SHOW_NO_FANMAIL_MESSAGE = false
    if (SHOW_NO_FANMAIL_MESSAGE)
        return (
            <Message
                content="This user doesn't have any fanmail. Be the first to leave them a video!"
            />
        )
    return (
        <React.Fragment>
            <Card.Group itemsPerRow={3}>
                <FanSubmissionCard mail={fake_mail} influencerID={influencerID} />
                <FanSubmissionCard mail={fake_mail1} influencerID={influencerID} />
                <FanSubmissionCard mail={fake_mail2} influencerID={influencerID} />
            </Card.Group>
            <br />
        </React.Fragment>
    )
}

const TopFanSubmissions: React.FC<ITopFanSubmissionsProps> = (props) => (
    <Segment>
        <Label
            attached='top'
            content='Fan Submissions'
        />
        {
            props.loading ?
                <Card.Group itemsPerRow={3}>
                    <FanSubmissionCardLoad />
                    <FanSubmissionCardLoad />
                    <FanSubmissionCardLoad />
                </Card.Group>
                :
                props.fanSubmissions.length > 0 ?
                    <Card.Group itemsPerRow={3}>
                        {
                            props.fanSubmissions.map((mail: IFanMail) => (
                                <FanSubmissionCard mail={mail} influencerID={props.influencerID} />
                            ))
                        }
                    </Card.Group>
                    :
                    renderNoFanMailMessage(props.influencerID)
        }
        {
            (props.loading || props.fanSubmissions.length > 0) && <br />
        }
        <Button
            fluid
            content='Submit Fanmail'
            style={{ color: 'white', backgroundColor: PRIMARY_COLOR }}
            onClick={() => props.history.push(`/in/${props.influencerID}/send`)}
        />
    </Segment>
);


export default withRouter(TopFanSubmissions) 