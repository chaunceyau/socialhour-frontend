import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloProvider } from "react-apollo"
import { Helmet } from 'react-helmet'
import 'semantic-ui-css/semantic.min.css'
import { client } from './client';


ReactDOM.render(
  <ApolloProvider client={client}>
    <Helmet>
      <meta charSet="utf-8" />
      <title>SocialHour - Influencer Fanmail & Live Events</title>
      <meta name='description' content='Send fanmail videos to your favorite influencers on SocialHour. We also host live interactive fan engagement events such as meet and greets.' />
    </Helmet>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
