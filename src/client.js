import ApolloClient, { PresetConfig } from "apollo-boost";
import firebase from 'firebase'

export const client = new ApolloClient({
    uri: process.env.NODE_ENV === 'production' ?
        process.env.REACT_APP_BACKEND_URL : 'http://localhost:4000/graphql',
    request: async (operation) => {
        console.log(process.env.NODE_ENV === 'production' ?
            process.env.REACT_APP_BACKEND_URL : 'http://localhost:4000/graphql')
        let token = null
        if (firebase.auth().currentUser)
            token = await firebase.auth().currentUser.getIdToken().then(token => token)
        return operation.setContext({
            headers: {
                authorization: token
            }
        })
    }
}) 