import React from 'react'
import { Switch, Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { Segment, Container, Header } from 'semantic-ui-react';
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
// 
import { Navigation } from './components'
import { ROUTE_CONFIG, COLOR_BACKGROUND_GREY, PRIMARY_COLOR } from './Config'
import FirebaseAuthProvider from './views/Auth/FirebaseAuthProvider';
import Footer from './components/Footer';

export default class App extends React.Component {
    render() {
        return (
            <AppWrapperDiv>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>SocialHour - Fan Mail & Live Events</title>
                    {/* <link rel="canonical" href="http://mysite.com/example" /> */}
                </Helmet>
                <FirebaseAuthProvider>
                    <Router>
                        <Navigation />
                        <Container style={{ paddingTop: '1rem', marginBottom: '2rem' }}>
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
            </AppWrapperDiv>
        )
    }
}

const AppWrapperDiv = styled.div`
    background-color: ${COLOR_BACKGROUND_GREY}
    display: flex
    flex-direction: column
    min-height: 100vh 
`