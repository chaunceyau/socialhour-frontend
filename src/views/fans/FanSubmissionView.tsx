import * as React from 'react';
import { Form, Button, Card, Icon, Modal, Segment } from 'semantic-ui-react';
import { Formik, FormikActions, FormikErrors } from 'formik'
import { withRouter, RouteComponentProps } from 'react-router';
import firebase from 'firebase'
import { gql } from 'apollo-boost';
import uuid from 'uuid/v4';
import moment from 'moment'
// 
import { client } from '../../client';
import { IInfluencerRouteParamProps, QUERY_INFLUENCER_EVENTS_AND_MAIL } from './InfluencerLandingView';
import { FirebaseAuthContext } from '../all/Auth/FirebaseAuthProvider';
import { ErrorResponse } from 'apollo-link-error';
import SignIn from '../all/Auth/SignIn';
import { COLOR_BACKGROUND_GREY } from '../../Config';

export interface IFanSubmissionViewProps extends RouteComponentProps<IInfluencerRouteParamProps> {
    influencerID: string
}

interface IFanSubmissionViewState {
    video: File | null
    errorMessage: string
    loginModalOpen: boolean
}

interface IFanSubmissionViewValues {
    title: string
    description: string
    tos_accepted: boolean
}

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = firebase.storage();

// Create a storage reference from our storage service
const videoStorageRef = storage.ref();


const acceptedVideoTypes: string[] = ['video/mp4']

const MUTATION_FAN_MAIL_SUBMISSION = gql`
    mutation MUTATION_FAN_MAIL_SUBMISSION(
        $title: String!
        $description: String!
        $video_url: String!
        $video_thumbnail_url: String!
        $influencer_id: ID!
    ) {
        submitFanMail(
            title: $title
            description: $description
            video_url: $video_url
            video_thumbnail_url: $video_thumbnail_url
            influencer_id: $influencer_id
        ) {
            id
            title
            description
            video_url
            video_private
            video_thumbnail_url
            influencer_watched
            from {
                id
                name
                avatar_url
            }
            to {
                id
                name
                avatar_url
            }
        }
    }

`

const QUERY_LAST_SUBMISSION_TIME = gql`
    query {
        lastSubmission
    }
`

class FanSubmissionView extends React.Component<IFanSubmissionViewProps, IFanSubmissionViewState> {
    state = {
        video: null,
        errorMessage: '',
        loginModalOpen: false
    }

    async saveVideoAndInformation(values: IFanSubmissionViewValues, actions: FormikActions<IFanSubmissionViewValues>) {

        const videoID = uuid()
        // 2. SAVE VIDEO TO FIREBASE
        videoStorageRef.child('videos/' + videoID)
            .put(this.state.video!)
            .then(async snapshot => {

                let video_url = ""
                await snapshot.ref.getDownloadURL().then(url => {
                    video_url = url
                }).catch(err => { })

                // 3. SAVE FUN SUBMISSION INFO TO POSTGRES DB
                const submission = await client.mutate({
                    mutation: MUTATION_FAN_MAIL_SUBMISSION,
                    variables: {
                        title: values.title,
                        description: values.description,
                        video_url: video_url,
                        video_thumbnail_url: "random",
                        influencer_id: this.props.influencerID,
                    },
                    update: (store: any, { data: { submitFanMail } }: any) => {
                        /** 1. update mail array in influencer query  */

                        // Read the data from our cache for this query.
                        const data = store.readQuery({ query: QUERY_INFLUENCER_EVENTS_AND_MAIL, variables: { influencerID: this.props.influencerID } });


                        // add the new elements
                        data.influencer.mail.unshift({ ...submitFanMail });
                        // we only want 3 showing
                        data.influencer.mail.length = 3

                        // Write our data back to the cache.
                        store.writeQuery({ query: QUERY_INFLUENCER_EVENTS_AND_MAIL, variables: { influencerID: this.props.influencerID }, data });

                        /** 2. update last submission query to prevent overposting */

                        // Read the data from our cache for this query.
                        let lastSubmissionData = store.readQuery({ query: QUERY_LAST_SUBMISSION_TIME });
                        // Set time to now
                        lastSubmissionData.lastSubmission = moment().format()
                        // Write our data back to the cache.
                        store.writeQuery({ query: QUERY_LAST_SUBMISSION_TIME, data: { ...lastSubmissionData } })
                    },
                })
                    .then((info: any) => {
                        // 4. Set submitting back to false after competition
                        actions.setSubmitting(false)
                        this.props.history.push(`/in/${this.props.influencerID}`)
                    })
                    .catch((err: ErrorResponse) => {
                        // 4. Set submitting back to false after competition
                        actions.setError(err)
                        actions.setSubmitting(false)
                    })

                if (!submission) {
                    // TODO: Issue if no submission, we need to handle.
                }
            })
            .catch(err => actions.setError(err));
    }

    render() {

        return (
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        <Icon
                            name='arrow left'
                            link
                            onClick={
                                () => this.props.history.push(`/in/${this.props.match.params.influencerID}`)
                            }
                        />
                        <span>&nbsp; Fanmail Form</span>
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <FirebaseAuthContext.Consumer>
                        {({ isUserSignedIn }) => {
                            return (
                                <Formik
                                    initialValues={{ title: '', description: '', tos_accepted: false }}
                                    validate={(values: IFanSubmissionViewValues) => {
                                        let errors: FormikErrors<IFanSubmissionViewValues> = {};
                                        if (!values.tos_accepted)
                                            errors.tos_accepted = "You must accept the Terms & Conditions and Privacy Policy to submit a video."


                                        // 1. CHECK VIDEO TITLE
                                        if (values.title.length < 2)
                                            errors.title = "Please enter a title at least 2 characters or longer."
                                        if (values.title.length > 100)
                                            errors.title = "Please enter a title less than 100 characters."
                                        // 2. CHECK VIDEO DESCRIPTION
                                        if (values.description.length < 2)
                                            errors.description = "Please enter a description at least 2 characters or longer."
                                        if (values.description.length > 150)
                                            errors.description = "Please enter a description less than 150 characters."

                                        return errors;
                                    }}
                                    onSubmit={async (values: IFanSubmissionViewValues, actions: FormikActions<IFanSubmissionViewValues>) => {
                                        // 1. CHECK LAST SUBMISSION TIME
                                        const { data } = await client.query({ query: QUERY_LAST_SUBMISSION_TIME })
                                        // if null.. user hasn't made a submission so no need to check difference in time
                                        if (data.lastSubmission !== null) {
                                            const now = moment(), lastSubmission = moment(data.lastSubmission).format(), difference = now.diff(lastSubmission, 'seconds')
                                            if (difference < 60) {
                                                // TODO: what if lastSubmission is null?
                                                actions.setSubmitting(false)
                                                return this.setState({ errorMessage: `You must wait ${60 - difference} seconds before your next submission.` })
                                            }
                                        }
                                        // 2. CHECK VIDEO
                                        if (this.state.video) {
                                            const { type, size } = this.state.video!
                                            if (!acceptedVideoTypes.includes(type)) {
                                                this.setState({ errorMessage: 'The video you selected is not a valid type. We currently only accept MP4. You can find many converters on google.' })
                                                actions.setSubmitting(false)
                                            }
                                            // size of 30 seconds 1080p @ 30fps
                                            if (size > 65 * 1024 * 1024) {
                                                this.setState({ errorMessage: "Please submit a video less than 65MB in size. This is 1 minute @ 1080p 30fps." })
                                                actions.setSubmitting(false)
                                                return
                                            }
                                        } else {
                                            this.setState({ errorMessage: 'Please submit a video..' })
                                            actions.setSubmitting(false)
                                        }

                                        if (!isUserSignedIn) {
                                            this.setState({ loginModalOpen: true })
                                            actions.setSubmitting(false)
                                            return;
                                        }
                                        this.saveVideoAndInformation(values, actions)

                                    }}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        setFieldValue,
                                        isSubmitting,
                                    }) => (
                                            <Form onSubmit={handleSubmit} loading={isSubmitting}>
                                                <Modal
                                                    header="Login to Send Fanmail"
                                                    content={
                                                        <div style={{ backgroundColor: COLOR_BACKGROUND_GREY }}>
                                                            <SignIn
                                                                afterSignIn={() => {
                                                                    this.setState({ loginModalOpen: false })
                                                                    handleSubmit()
                                                                }}
                                                            />
                                                            <br /><br />
                                                        </div>
                                                    }
                                                    open={this.state.loginModalOpen}
                                                    closeOnDimmerClick={true}
                                                    size="small"
                                                    closeIcon
                                                    onClose={() => this.setState({ loginModalOpen: false })}
                                                />
                                                {/* Title */}
                                                <Form.Field required >
                                                    <label>Title</label>
                                                    <Form.Input
                                                        error={errors.title && touched.title && errors.title}
                                                        type="text"
                                                        name="title"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.title}
                                                    />
                                                </Form.Field>

                                                {/* Description */}
                                                <Form.Field required >
                                                    <label>Description</label>
                                                    <Form.Input
                                                        error={errors.description && touched.description && errors.description}
                                                        type="text"
                                                        name="description"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.description}
                                                    />
                                                </Form.Field>

                                                {/* Video Upload */}
                                                <Form.Field required>
                                                    <label>Video Upload - 30 Second Limit (Longer options coming soon)</label>
                                                    <Form.Input
                                                        error={this.state.errorMessage.length > 0 && this.state.errorMessage}
                                                        type='file'
                                                        name='video'
                                                        accept="video/mp4,video/x-m4v,video/*"
                                                        onChange={e => {
                                                            this.setState({ errorMessage: '', video: e.target.files![0] })
                                                        }}
                                                    />
                                                </Form.Field>

                                                <Form.Field>
                                                    <label>Submission Rules - Submissions violating rules are automatically deleted</label>
                                                    <Segment>
                                                        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                                                            <li>No asking for things (e.g. add me, re-tweet me, etc.)</li>
                                                            <li>Keep submission appropriate for all audiences</li>
                                                        </ul>
                                                    </Segment>
                                                </Form.Field>
                                                <Form.Field>
                                                    <Form.Checkbox
                                                        error={errors.tos_accepted && touched.tos_accepted && errors.tos_accepted}
                                                        name='tos_accepted'
                                                        type="checkbox"
                                                        label="I agree to the Terms and Conditions, Privacy Policy and Submission Rules."
                                                        onChange={() => setFieldValue('tos_accepted', !values.tos_accepted)}
                                                        onBlur={handleBlur}
                                                        checked={values.tos_accepted}
                                                    />
                                                </Form.Field>
                                                {/*  */}
                                                <Button
                                                    primary
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                >
                                                    Send Fanmail
                                                </Button>
                                            </Form>
                                        )}
                                </Formik>
                            )
                        }}
                    </FirebaseAuthContext.Consumer>
                </Card.Content>
            </Card>
        );
    }
}

export default withRouter(FanSubmissionView)