import * as React from 'react';
import firebase from 'firebase'
import { withRouter, RouteComponentProps } from 'react-router';

export interface ILogoutProps extends RouteComponentProps {
}

class Logout extends React.Component<ILogoutProps> {

    componentDidMount() {
        firebase.auth().signOut().then(data => this.props.history.push('/'))
    }

    render() {
        return (
            <div>
                You will be redirected shortly.
            </div>
        );
    }
}

export default withRouter(Logout)