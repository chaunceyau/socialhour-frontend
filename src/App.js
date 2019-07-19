import React from 'react'
import { Switch, Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { Navigation } from './components'
import { ROUTE_CONFIG, COLOR_BACKGROUND_GREY, PRIMARY_COLOR } from './Config'
import FirebaseAuthProvider from './views/Auth/FirebaseAuthProvider';
import { Segment, Container, Label, Header } from 'semantic-ui-react';
import Footer from './components/Footer';

export default class App extends React.Component {
    render() {
        return (
            <div style={{ backgroundColor: COLOR_BACKGROUND_GREY, height: '100%' }}>
                <FirebaseAuthProvider>
                    <Router>
                        <Navigation />
                        <Container style={{ paddingTop: '1rem' }}>
                            <Segment attached='top' style={{ backgroundColor: PRIMARY_COLOR }}>
                                <Header textAlign='center' style={{ color: 'white' }}>
                                    Influencer Fan Mail & Live Events
                                </Header>
                            </Segment>
                            <Segment attached='bottom' style={{ padding: '1rem' }}>
                                {/* <Header textAlign='center' style={{ color: PRIMARY_COLOR }}>Influencer Fan Mail & Live Events</Header> */}
                                {/* <Label attached='top' content='Influencer Fan Mail & Live Events' style={{ color: 'white', backgroundColor: PRIMARY_COLOR }} /> */}
                                <Switch>
                                    {
                                        ROUTE_CONFIG.map((route, index) => <Route key={index} {...route} />)
                                    }
                                </Switch>
                            </Segment>
                        </Container>
                        <Footer />
                    </Router>
                </FirebaseAuthProvider>
            </div>
        )
    }
}