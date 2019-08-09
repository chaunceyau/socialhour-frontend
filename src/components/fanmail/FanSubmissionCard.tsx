import * as React from 'react'
import { IFanMail } from '../../Interfaces'
import { Card, Icon, Image } from 'semantic-ui-react'
import { withRouter, RouteComponentProps } from 'react-router'
const VideoPlaceholder = require('../../assets/placeholder.png')

export interface IFanSubmissionCardProps extends RouteComponentProps {
    mail: IFanMail,
    influencerID: string
}

const FanSubmissionCard: React.FC<IFanSubmissionCardProps> = (props: IFanSubmissionCardProps) => (
    <Card
        key={props.mail.id}
        onClick={() => { }
            // props.history.push(`/in/${props.influencerID}/submission/${props.mail.id}`)
        }
    >
        <Image src={props.mail.video_thumbnail_url !== 'random' ? props.mail.video_thumbnail_url : VideoPlaceholder} style={{ height: 150, objectFit: 'cover' }} />
        <Card.Content>
            <Card.Header>{props.mail.title}</Card.Header>
            <Card.Meta>
                <Icon name='user circle' />
                <span>{props.mail.from.name}</span>
            </Card.Meta>
        </Card.Content>
    </Card>
);

export default withRouter(FanSubmissionCard)