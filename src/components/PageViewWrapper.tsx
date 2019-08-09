import * as React from 'react'
import { Container, Segment, Header } from 'semantic-ui-react'
import styled from 'styled-components'
import { PRIMARY_COLOR } from '../Config'
import Routes from '../Routes'

export interface IPageViewWrapperProps {
  pageType: 'fan' | 'influencer' | 'admin' | 'profile'
}

enum PageTitle {
  'fan' = 'Influencer Fanmail & Live Events',
  'influencer' = 'influencer',
  'admin' = 'admin',
  'profile' = 'My Profile'
}

export default class PageViewWrapper extends React.Component<IPageViewWrapperProps> {
  render() {
    console.log("this.props.children", this.props.children)
    return (
      <Container style={{ paddingTop: '1rem', marginBottom: '2rem' }}>
        <Segment attached='top' style={{ backgroundColor: PRIMARY_COLOR }}>
          <Header textAlign='center' style={{ color: 'white' }}>
            <InfluencerHeader>{PageTitle[this.props.pageType]}</InfluencerHeader>
          </Header>
        </Segment>
        <Segment attached='bottom' style={{ padding: '1rem' }}>
          {this.props.children}
        </Segment>
      </Container>
    )
  }
}


const InfluencerHeader = styled.h1`
    font-size: 1.5rem
`
