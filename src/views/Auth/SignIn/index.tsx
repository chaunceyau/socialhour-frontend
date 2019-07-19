// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { RouteComponentProps, withRouter } from 'react-router';
import { Container, Grid, Segment, Image, Header } from 'semantic-ui-react';

interface ISignInScreenProps extends RouteComponentProps {
    afterSignIn?: () => void
}
class SignInScreen extends React.Component<ISignInScreenProps> {
    unregisterAuthObserver: any
    // The component's Local state.
    state = {
        isSignedIn: false // Local signed-in state.
    };

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
        tosUrl: 'https://www.termsandcondiitionssample.com/live.php?token=C60AnPGmFF4CA9EAIIFr53h698v2GRBa',
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        callbacks: {
            signInSuccessWithAuthResult: (authResult: any) => {
                console.log('signInSuccessWithAuthResult')

                if (authResult.isNewUser) {
                    // TODO: create new user in our database...
                    // HMMM. how will we know if it's a influencer?
                }
                if (this.props.afterSignIn) {
                    this.props.afterSignIn()
                    return false
                }
                console.log(',F)D!#$K$#)K!F)#$,')
                return true
            }
            // Avoid redirects after sign-in.
        },
        signInSuccessUrl: '/'

    };

    // Listen to the Firebase Auth state and set the local state.
    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    if (this.props.location.pathname === '/auth/signin')
                        this.props.history.push('/')
                }
            }
        );
    }

    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    render() {
        if (!this.state.isSignedIn) {
            return (
                <Container textAlign='center'>
                    <br />
                    <Grid doubling stackable centered>
                        <Grid.Row>
                            <Grid.Column width={6} style={{ minWidth: 350 }}>
                                <Segment>
                                    <Image centered size="small" src={require('../../../assets/logostacked@4x.png')} />
                                    <br />
                                    <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container >
            );
        }
        return (
            <div>
                <h1>My App</h1>
                {/* <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p> */}
                <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
            </div>
        );
    }
}

export default withRouter(SignInScreen)