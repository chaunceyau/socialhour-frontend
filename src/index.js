import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloProvider } from "react-apollo"
import ApolloClient from "apollo-boost"
import firebase from 'firebase'
import { Helmet } from 'react-helmet'
import 'semantic-ui-css/semantic.min.css'

export const client = new ApolloClient({
  uri: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BACKEND_URL : 'http://localhost:4000/graphql',
  request: async operation => {
    let token = null
    if (firebase.auth().currentUser)
      token = await firebase.auth().currentUser.getIdToken().then(token => token)
    return operation.setContext({
      headers: {
        authorization: token
      }
    })
  },
})

// const firebaseConfig = {
//   apiKey: "AIzaSyAISvEcClH4XE4ZRzEbY71CSj_bA5OBWps",
//   authDomain: "socialhour.firebaseapp.com",
//   databaseURL: "https://socialhour.firebaseio.com",
//   projectId: "socialhour",
//   storageBucket: "",
//   messagingSenderId: "1076044135012",
//   appId: "1:1076044135012:web:9b1de87c5d923fe5"
// }

// firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <ApolloProvider client={client}>
    <Helmet>
      <meta charSet="utf-8" />
      <title>SocialHour - Influencer Fanmail & Live Events</title>
      <meta name='description' content='Send fanmail videos to your favorite influencers on SocialHour. We also host live interactive fan engagement events such as meet and greets.' />
      {/* <link rel="canonical" href="http://mysite.com/example" /> */}
    </Helmet>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
