import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Segment, Container, Header } from 'semantic-ui-react';
import styled from 'styled-components'
// 
import { Navigation, Footer } from './components'
import { COLOR_BACKGROUND_GREY, PRIMARY_COLOR } from './Config'
import FirebaseAuthProvider from './views/all/Auth/FirebaseAuthProvider';
import Routes from './Routes'

const App: React.FC = () => (
    <AppWrapperDiv>
        <FirebaseAuthProvider>
            <Router>
                <Navigation />
                <ContentWrap>
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
                </ContentWrap>
                <Footer />
            </Router>
        </FirebaseAuthProvider>
    </AppWrapperDiv>
)

const AppWrapperDiv = styled.div`
    background-color: ${COLOR_BACKGROUND_GREY}
    position: relative
    min-height: 100vh 
`

const InfluencerHeader = styled.h1`
    font-size: 1.5rem
`

const ContentWrap = styled.div`
    padding-bottom: 2.5rem;    /* Footer height */
`

export default App
