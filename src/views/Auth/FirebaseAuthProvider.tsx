// @flow
import * as React from "react";

import Firebase from "./Firebase";

const defaultFirebaseContext = {
    authStatusReported: false,
    isUserSignedIn: false
};

export const FirebaseAuthContext = React.createContext(defaultFirebaseContext);

type FireAuthProviderProps = {
    children: React.ReactNode
};

type FireAuthProviderState = {
    authStatusReported: boolean,
    isUserSignedIn: boolean
};

export default class FirebaseAuthProvider extends React.Component<FireAuthProviderProps, FireAuthProviderState> {

    state = defaultFirebaseContext;

    componentDidMount() {
        Firebase.auth.onAuthStateChanged(user => {
            console.log("AUTH CHANGESDDD", user)
            return this.setState({
                authStatusReported: true,
                isUserSignedIn: !!user
            })
        });
    }

    render(): React.ReactNode {
        const { children } = this.props;
        const { authStatusReported, isUserSignedIn } = this.state;
        return (
            <FirebaseAuthContext.Provider value={{ isUserSignedIn, authStatusReported }}>
                {authStatusReported && children}
            </FirebaseAuthContext.Provider>
        );
    }
}