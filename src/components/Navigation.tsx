import * as React from 'react';
import { Menu, StrictMenuItemProps } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { FirebaseAuthContext } from '../views/Auth/FirebaseAuthProvider';
export interface INavigationProps {
}

export default class Navigation extends React.Component<INavigationProps> {
    state = {
        activeItem: ''
    }

    handleItemClick: StrictMenuItemProps['onClick'] = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu>
                <Menu.Item header>
                    <img src={require('../assets/logo-32x32.png')} alt="logo" style={{ width: 20, height: 20, marginRight: '1rem' }} />
                    <Link to='/'>SocialHour</Link>
                </Menu.Item>
                <Menu.Item
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
                />
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
