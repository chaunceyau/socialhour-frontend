import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Segment, Container, Header } from 'semantic-ui-react';
import styled from 'styled-components'
// 
import { Navigation } from './components'
import { COLOR_BACKGROUND_GREY, PRIMARY_COLOR } from './Config'
import FirebaseAuthProvider from './views/Auth/FirebaseAuthProvider';
import Footer from './components/Footer';
import Routes from './Routes'

export default class App extends React.Component {
    render() {
        return (
            <AppWrapperDiv>
                <FirebaseAuthProvider>
                    <Router>
                        <Navigation />
                        <Container style={{ paddingTop: '1rem', marginBottom: '2rem' }}>
                            <Segment attached='top' style={{ backgroundColor: PRIMARY_COLOR }}>
                                <Header textAlign='center' style={{ color: 'white' }}>
                                    <InfluencerHeader>Influencer Fanmail & Live Events</InfluencerHeader>
                                </Header>
                            </Segment>
                            <Segment attached='bottom' style={{ padding: '1rem' }}>
                                <Routes />
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

const InfluencerHeader = styled.h1`
    font-size: 1.5rem
`