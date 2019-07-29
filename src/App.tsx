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
                            <Segment>
                                <p>SocialHour is a platform for fan engagement. Fans can submit short video-based fanmail to their favorite influencers. We work with influencers to schedule live events to watch and repsond to their fanmail, as well as many other event types including online meet and greets. Record a short piece of fanmail and send it to your favorite influencers. More features coming very soon so stay informed!</p>
                                <p>If you are an influencer looking to access your fanmail submissions, shoot us an email at contact@socialhour.tv or fill out our form coming very shortly.</p>
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