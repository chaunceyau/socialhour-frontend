import React from 'react'
import { FirebaseAuthContext } from "./FirebaseAuthProvider";
import { Redirect } from 'react-router-dom'

export default class ProtectedScreen extends React.PureComponent<{}> {
    render(): React.ReactNode {
        const { children } = this.props;
        return (
            <FirebaseAuthContext.Consumer>
                {
                    ({ isUserSignedIn }) => {
                        if (isUserSignedIn) {
                            return children;
                        }
                        return <Redirect to="/signin" />;
                    }
                }
            </FirebaseAuthContext.Consumer>
        );
    }
};