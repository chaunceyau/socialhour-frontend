import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import { RouteComponentProps, withRouter } from 'react-router'
import { Container, Grid, Segment, Image } from 'semantic-ui-react'
import { gql } from 'apollo-boost'
// 
import StackedLogo from '../../../../assets/logostacked.png'
import { client } from '../../../../client'
import { FirebaseAuthContext } from '../FirebaseAuthProvider';

interface ISignInScreenProps extends RouteComponentProps {
    afterSignIn?: () => void
}

class SignInScreen extends React.Component<ISignInScreenProps> {

    // Configure FirebaseUI.
    uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        ],
        tosUrl: 'https://socialhour.tv/tos',
        privacyPolicyUrl: 'https://socialhour.tv/privacy',
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        callbacks: {
            signInSuccessWithAuthResult: (authResult: any) => {
                console.log("SIGN IN ")
                const { additionalUserInfo, user } = authResult
                const { uid } = user
                const { isNewUser, profile } = additionalUserInfo
                if (isNewUser) {
                    // email, given_name, picture, uid
                    const new_user = client.mutate({
                        mutation: MUTATION_CREATE_NEW_USER,
                        variables: {
                            name: profile.given_name,
                            email: profile.email,
                            avatar_url: profile.picture,
                            firebase_id: uid
                        }
                    })
                        .then((data: any) => {
                            return true
                        })
                        .catch((err: any) => {
                            console.log('errOR', err)
                            return true
                        })
                    console.log("mutation ", new_user)

                } else {
                    console.log("NOT NEW")
                }
                if (this.props.afterSignIn) {
                    this.props.afterSignIn()
                    return false
                }
                return false
            }
            // Avoid redirects after sign-in.
        },
        signInSuccessUrl: '/'

    };

    render() {
        return (
            <FirebaseAuthContext.Consumer>
                {({ isUserSignedIn }) => {
                    if (isUserSignedIn) {
                        if (this.props.location.pathname === '/auth/signin')
                            this.props.history.push('/')
                    }

                    return (
                        <Container textAlign='center'>
                            <br />
                            <Grid doubling stackable centered>
                                <Grid.Row>
                                    <Grid.Column width={6} style={{ minWidth: 350 }}>
                                        <Segment>
                                            <Image centered size="small" src={StackedLogo} />
                                            <br />
                                            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <br />
                        </Container >
                    )
                }}
            </FirebaseAuthContext.Consumer>
        );
    }
}

const MUTATION_CREATE_NEW_USER = gql`
    mutation (
        $name: String!
        $email: String!
        $avatar_url: String!
        $firebase_id: String!
    ) {
        createUser (
            name: $name
            email: $email
            avatar_url: $avatar_url
            firebase_id: $firebase_id
        ) {
            id
            name
            avatar_url
        }
    }

`

export default withRouter(SignInScreen)
