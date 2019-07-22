import * as React from 'react';
import { Image, Grid, Button, Search, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
// 
import { FirebaseAuthContext } from '../views/Auth/FirebaseAuthProvider';
import { PRIMARY_COLOR } from '../Config';
import NavigationLogo from '../assets/nav_logo.png'

export interface INavigationProps {
}

export default class Navigation extends React.Component<INavigationProps> {

    render() {
        return (
            <Segment>
                <Grid stackable centered>
                    <Grid.Row columns={3} centered>
                        <Grid.Column width={3}>
                            <Link to='/'>
                                <Image centered src={NavigationLogo} alt="logo" size="small" />
                            </Link>
                        </Grid.Column>
                        <Grid.Column width={11} >
                            <Search input={{ fluid: true, placeholder: 'Find your favorite influencer or event...' }} style={{ width: '70%', margin: '0 auto' }} />
                        </Grid.Column>
                        <Grid.Column width={2} textAlign='center'>
                            <FirebaseAuthContext.Consumer>
                                {({ isUserSignedIn }) => {
                                    if (!isUserSignedIn)
                                        return (
                                            <Button
                                                as={Link}
                                                to='/auth/signin'
                                                icon='lock'
                                                content='Login'
                                                style={{ backgroundColor: PRIMARY_COLOR, color: 'white' }}
                                            />
                                        )
                                    return (
                                        <Button
                                            as={Link}
                                            to='/auth/logout'
                                            icon='lock'
                                            content='Logout'
                                            style={{ backgroundColor: PRIMARY_COLOR, color: 'white' }}
                                        />
                                    )
                                }}
                            </FirebaseAuthContext.Consumer>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        )
    }
}
