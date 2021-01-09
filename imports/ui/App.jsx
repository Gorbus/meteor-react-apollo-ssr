import React from "react";
import {
  InMemoryCache,
  ApolloProvider,
  ApolloClient,
  ApolloLink,
  createHttpLink,
} from "@apollo/client";
// import { MeteorAccountsLink } from 'meteor/apollo'
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes.jsx";

const cache = new InMemoryCache().restore(window.__APOLLO_STATE__);

const link = ApolloLink.from([
  // MeteorAccountsLink(),

  new createHttpLink({
    uri: "/graphql",
  }),
]);

const client = new ApolloClient({
  uri: "/graphql",
  cache,
  link,
  ssrMode: false,
  ssrForceFetchDelay: 100,
});

export const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </ApolloProvider>
);
