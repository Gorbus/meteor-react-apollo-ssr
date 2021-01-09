import React from 'react'
import { ApolloProvider } from '@apollo/client'
import Routes from "./../ui/Routes";
import Router from './Router'


export default function App({ client, location }) {
  return (
    <ApolloProvider client={client}>
      <Router location={location}>
        <Routes />
      </Router>
    </ApolloProvider>
  )
}
