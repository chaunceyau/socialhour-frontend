import * as React from 'react';
import { Segment, Container, Search, Divider, Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router';
import UpcomingEvents from './UpcomingEvents';
import TrendingFanMail from './TrendingFanMail';

interface IHomeProps extends RouteComponentProps {
}
interface IHomeState {
}

class Home extends React.Component<IHomeProps, IHomeState> {
    render() {
        return (
            <Container>
                <Segment style={{ padding: 0 }}>
                    <div style={{ backgroundPosition: 'bottom', backgroundSize: 'cover', backgroundImage: "url('https://azurecomcdn.azureedge.net/cvt-f63886b5fdd7f52da4c8dd89f1686075b01bc3eb496cc62b2ca289cc0d71e372/images/page/services/devops/hero-images/index-hero.jpg')" }}>
                        <div style={{ padding: '2em 2em' }}>
                            <Header textAlign='center'>Search for events or influencers</Header>
                            <Search
                                input={{
                                    fluid: true,
                                    placeholder: 'Find a influencer or upcoming live event...'
                                }}
                            />
                        </div>
                    </div>
                    <div style={{ margin: '1em' }}>
                        <Divider />
                        <UpcomingEvents />
                        <TrendingFanMail />
                    </div>
                </Segment>
            </Container >
        );
    }
}

export default withRouter(Home)



