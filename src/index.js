import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import firebase from 'firebase'

export const client = new ApolloClient({
  uri: "http://localhost:4466",
  request: async operation => {
    console.log("firebase.auth().currentUser.getIdToken()")
    let token = null
    if (firebase.auth().currentUser)
      token = await firebase.auth().currentUser.getIdToken().then(token => token)
    return operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
});

// const firebaseConfig = {
//   apiKey: "AIzaSyAISvEcClH4XE4ZRzEbY71CSj_bA5OBWps",
//   authDomain: "socialhour.firebaseapp.com",
//   databaseURL: "https://socialhour.firebaseio.com",
//   projectId: "socialhour",
//   storageBucket: "",
//   messagingSenderId: "1076044135012",
//   appId: "1:1076044135012:web:9b1de87c5d923fe5"
// };

// firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
