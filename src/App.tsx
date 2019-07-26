import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Segment, Container, Header } from 'semantic-ui-react';
import { Helmet } from 'react-helmet'
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
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>SocialHour - Influencer Fanmail & Live Events</title>
                    <meta name='description' content='Send fanmail videos to your favorite influencers on SocialHour. We also host live interactive fan engagement events such as meet and greets.' />
                    {/* <link rel="canonical" href="http://mysite.com/example" /> */}
                </Helmet>
                <FirebaseAuthProvider>
                    <Router>
                        <Navigation />
                        <Container style={{ paddingTop: '1rem', marginBottom: '2rem' }}>
                            <Segment attached='top' style={{ backgroundColor: PRIMARY_COLOR }}>
                                <Header textAlign='center' style={{ color: 'white' }}>
                                    <h1>Influencer Fanmail & Live Events</h1>
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