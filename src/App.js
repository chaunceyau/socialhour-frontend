import React from 'react'
import { Switch, Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { Navigation } from './components'
import { ROUTE_CONFIG, COLOR_BACKGROUND_GREY } from './Config'
import FirebaseAuthProvider from './views/Auth/FirebaseAuthProvider';

export default class App extends React.Component {
    render() {
        return (
            <div style={{ backgroundColor: COLOR_BACKGROUND_GREY, height: '100vh' }}>
                <FirebaseAuthProvider>
                    <Router>
                        <Navigation />
                        <Switch>
                            {
                                ROUTE_CONFIG.map((route, index) => <Route key={index} {...route} />)
                            }
                        </Switch>
                    </Router>
                </FirebaseAuthProvider>
            </div>
        )
    }
}