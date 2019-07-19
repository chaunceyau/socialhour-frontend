import * as React from 'react';
import { Menu, StrictMenuItemProps, Image, Grid, GridRow, Button, Search, Input, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { FirebaseAuthContext } from '../views/Auth/FirebaseAuthProvider';
import GridBackground from '../assets/Background.png'
import { PRIMARY_COLOR } from '../Config';

export interface INavigationProps {
}

export default class Navigation extends React.Component<INavigationProps> {
    state = {
        activeItem: ''
    }

    handleItemClick: StrictMenuItemProps['onClick'] = (e, { name }) => this.setState({ activeItem: name })

    render3() {
        return (
            // <Grid style={{ }}>
            <Grid style={{ backgroundImage: `url(${GridBackground})`, backgroundPosition: 'top right' }}>
                <Grid.Row columns={3}>

                    <Grid.Column>
                    </Grid.Column>
                    <Grid.Column>
                        <Image centered src={require('../assets/socialhourlogo.png')} size="medium" />
                    </Grid.Column>
                    <Grid.Column>
                        <Button icon='lock' style={{ backgroundColor: 'white', color: PRIMARY_COLOR }} content='Login' floated='right' />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
    render() {
        return (
            <Segment>
                <Grid stackable centered>
                    <Grid.Row columns={3} centered>
                        <Grid.Column width={3}>
                            <Link to='/'>
                                <Image centered src={require('../assets/socialhourf2.png')} alt="logo" size="small" />
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

    render4() {
        const { activeItem } = this.state

        return (
            <Menu>
                <Menu.Menu position='left'>

                    <Menu.Item header>
                        <Image src={require('../assets/Asset 2@4x.png')} alt="logo" size="small" />
                        {/* <Link to='/'>SocialHour</Link> */}
                    </Menu.Item>
                    {/* <Menu.Item
                    name='Live Events'
                    active={activeItem === 'Live Events'}
                    onClick={this.handleItemClick}
                    icon='video'
                    as={Link}
                    to='/'
                />
                <Menu.Item
                    name='Fan Mail'
                    active={activeItem === 'Fan Mail'}
                    onClick={this.handleItemClick}
                    icon='envelope'
                    as={Link}
                    to='/'
                /> */}
                    <Menu.Item>
                        <Input style={{ width: '100%' }} />
                    </Menu.Item>
                </Menu.Menu>


                <FirebaseAuthContext.Consumer>
                    {({ isUserSignedIn }) => {
                        if (!isUserSignedIn)
                            return (
                                <Menu.Menu position='right'>
                                    <Menu.Item
                                        name='Login'
                                        active={activeItem === 'Login'}
                                        onClick={this.handleItemClick}
                                        icon='user circle'
                                        as={Link}
                                        to='/auth/signin'
                                    />
                                </Menu.Menu>
                            )
                        return (
                            <Menu.Menu position='right'>
                                <Menu.Item
                                    name='Logout'
                                    active={activeItem === 'Logout'}
                                    onClick={this.handleItemClick}
                                    icon='lock'
                                    as={Link}
                                    to='/auth/logout'
                                />
                            </Menu.Menu>
                        )
                    }}
                </FirebaseAuthContext.Consumer>

            </Menu>
        );
    }
}
