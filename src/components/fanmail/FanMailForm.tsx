import * as React from 'react';
import { Form, Button, Card, Icon, Modal } from 'semantic-ui-react';
import { Formik, FormikActions, FormikErrors } from 'formik'
import { withRouter, RouteComponentProps } from 'react-router';
import firebase from 'firebase'
import { gql } from 'apollo-boost';
import uuid from 'uuid/v4';

// 
import { client } from '../..';
import { IInfluencerRouteParamProps } from '../../views/Influencer';
import { FirebaseAuthContext } from '../../views/Auth/FirebaseAuthProvider';
import { ErrorResponse } from 'apollo-link-error';
import SignIn from '../../views/Auth/SignIn';
import { COLOR_BACKGROUND_GREY } from '../../Config';

export interface IFanMailFormProps extends RouteComponentProps<IInfluencerRouteParamProps> {
    influencerID: string
}

interface IFanMailFormState {
    video: File | null
    errorMessage: string
    loginModalOpen: boolean
}

interface IFanMailFormValues {
    title: string
    description: string
}

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = firebase.storage();

// Create a storage reference from our storage service
const videoStorageRef = storage.ref();


const acceptedVideoTypes: string[] = ['video/mp4']

const MUTATION_FAN_MAIL_SUBMISSION = gql`
    mutation(
        $title: String!
        $description: String!
        $video_url: String!
        $video_thumbnail_url: String!
        $influencer_id: ID!
        $from_id: ID!
    ) {
        createFanMailSubmission(
            data: {
                title: $title
                description: $description
                video_url: $video_url
                video_thumbnail_url: $video_thumbnail_url
                video_private: false
                to: { connect: { id: $influencer_id } }
                from: { connect: { id: $from_id } }
            }
        ) {
            id
        }
    }

`

class FanMailForm extends React.Component<IFanMailFormProps, IFanMailFormState> {
    state = {
        video: null,
        errorMessage: '',
        loginModalOpen: false
    }

    saveVideoAndInformation(values: IFanMailFormValues, actions: FormikActions<IFanMailFormValues>) {
        const videoID = uuid()
        // 1. SAVE VIDEO TO FIREBASE
        videoStorageRef.child('videos/' + videoID)
            .put(this.state.video!)
            .then(async snapshot => {

                console.log('Uploaded a blob or file!', snapshot);
                console.log('Uploaded a blob or file!', videoStorageRef.child('videos/testme2').getDownloadURL());
                let video_url = ""
                await snapshot.ref.getDownloadURL().then(url => {
                    console.log('url', url)
                    video_url = url
                })

                // 2. SAVE FUN SUBMISSION INFO TO POSTGRES DB
                const submission = await client.mutate({
                    mutation: MUTATION_FAN_MAIL_SUBMISSION, variables: {
                        title: values.title,
                        description: values.description,
                        video_url: video_url,
                        video_thumbnail_url: "random",
                        influencer_id: this.props.influencerID,
                        from_id: "cjy2drw0v004g0977v9ftnv4f"
                    }
                })
                    .then((info: any) => {
                        console.log('info', info)
                        // 3. Set submitting back to false after competition
                        actions.setSubmitting(false)
                        this.props.history.push(`/in/${this.props.influencerID}`)
                    })
                    .catch((err: ErrorResponse) => {
                        console.log(err)
                        // 3. Set submitting back to false after competition
                        actions.setError(err)
                        actions.setSubmitting(false)
                    })

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
                            onClick={() => { this.props.history.push(`/in/${this.props.match.params.influencerID}`) }}
                        />
                        <span>&nbsp; Fan Mail Form</span>
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <FirebaseAuthContext.Consumer>
                        {({ isUserSignedIn }) => {
                            return (
                                <Formik
                                    initialValues={{ title: '', description: '' }}
                                    validate={(values: IFanMailFormValues) => {
                                        let errors: FormikErrors<IFanMailFormValues> = {};
                                        // 1. CHECK VIDEO TITLE
                                        if (values.title.length < 2)
                                            errors.title = "Please enter a title at least 2 characters or longer."
                                        // 2. CHECK VIDEO DESCRIPTION
                                        if (values.description.length < 2)
                                            errors.description = "Please enter a description at least 2 characters or longer."
                                        // 2. CHECK VIDEO
                                        if (this.state.video) {
                                            const { type } = this.state.video!
                                            if (!acceptedVideoTypes.includes(type))
                                                this.setState({ errorMessage: 'The video you selected is not a valid type. We currently only accept MP4. You can find many converters on google.' })
                                        } else this.setState({ errorMessage: 'Please submit a video..' })

                                        return errors;
                                    }}
                                    onSubmit={(values: IFanMailFormValues, actions: FormikActions<IFanMailFormValues>) => {
                                        const { type, size } = this.state.video!

                                        if (!acceptedVideoTypes.includes(type)) {
                                            actions.setSubmitting(false)
                                            return
                                        }
                                        // size of 1 minute 1080p @ 30fps
                                        if (size > 130 * 1024 * 1024) {
                                            this.setState({ errorMessage: "Please submit a video less than 130MB in size. This is 1 minute @ 1080p 30fps." })
                                            actions.setSubmitting(false)
                                            return
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
                                        isSubmitting,
                                    }) => (
                                            <Form onSubmit={handleSubmit} loading={isSubmitting}>
                                                <Modal
                                                    header="Login to Send Fan Mail"
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
                                                    <label>Video Upload - 1 Minute Limit</label>
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

                                                {/*  */}
                                                <Button
                                                    primary
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                >
                                                    Send Fan Mail
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

export default withRouter(FanMailForm)