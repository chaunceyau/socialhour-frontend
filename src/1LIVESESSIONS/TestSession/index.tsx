import * as React from 'react';
import axios from 'axios'
import { Container } from 'semantic-ui-react';

export interface IAppProps {
}

export default class App extends React.Component<IAppProps> {
    state = {
        roomName: ''
    }

    handleGrabSession = async () => {
        const a = await axios.get('http://localhost:8080/room/' + this.state.roomName)
        console.log('a')
        console.log(a)
    }
    render() {
        return (
            <Container>
                <div>
                    testme {this.state.roomName}
                    <br />
                    <br />
                    <input placeholder='Room search' type='text' onChange={e => this.setState({ roomName: e.target.value })} />
                    <br />
                    <br />
                    <button onClick={this.handleGrabSession}>test</button>
                </div>
            </Container>
        );
    }
}
