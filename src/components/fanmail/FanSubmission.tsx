import * as React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost'

export interface IFanSubmissionProps extends RouteComponentProps<{ videoID: string }> {
    influencerID: string
}


class FanSubmission extends React.Component<IFanSubmissionProps> {
  
    render() {
        if (!this.props.match.params.videoID)
            return (
                <div>
                    <span>Issue finding video</span>
                </div>
            )
        return (
            <Query query={QUERY_FAN_MAILSUBMISSION_INFORMATION} variables={{ submissionID: this.props.match.params.videoID }}>
                {({ loading, error, data }: { loading: any, error?: any, data: any }) => {
                    if (loading || error)
                        return <span>loading</span>
                    if (data) {
                        const { fanMailSubmission } = data
                        return (
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>
                                        <Icon name='arrow left' link onClick={() => this.props.history.push('/in/' + this.props.influencerID)} />
                                        <span>{fanMailSubmission.title}</span>
                                    </Card.Header>
                                    <Card.Meta>
                                        Posted by <b>{fanMailSubmission.from.name}</b>
                                    </Card.Meta>
                                </Card.Content>
                                <Card.Content>
                                    <video width="100%" controls>
                                        <source src={fanMailSubmission.video_url} type="video/mp4" />
                                        Your browser does not support HTML5 video.
                                    </video>
                                </Card.Content>

                            </Card>
                        )
                    }
                }}
            </Query>
        );
    }
}

const QUERY_FAN_MAILSUBMISSION_INFORMATION = gql`
    query ($submissionID: ID!) {
        fanMailSubmission(where:{ id: $submissionID }) {
            id
            title
            video_url
            from {
                id
                name
            }
        }
    }
`

export default withRouter(FanSubmission)