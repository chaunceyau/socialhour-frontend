import * as React from 'react';
import { Segment, Label, Message, Button, Card } from 'semantic-ui-react';
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { IFanMail } from '../../Interfaces';
import { PRIMARY_COLOR } from '../../Config';
import FanSubmissionCard from './FanSubmissionCard';
import { LoadFanSubmissionCard } from './LoadFanSubmissionCard';

export interface ITopFanSubmissionsProps extends RouteComponentProps {
    fanSubmissions: IFanMail[],
    influencerID: string,
    loading: boolean
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
                    <LoadFanSubmissionCard />
                    <LoadFanSubmissionCard />
                    <LoadFanSubmissionCard />
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
                    <Message
                        content="This user doesn't have any fanmail. Be the first to leave them a video!"
                    />
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