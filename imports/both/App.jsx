import React from "react";
import { ApolloProvider } from "@apollo/client";
import Routes from "./../ui/Routes";
import Router from "./Router";
import { Helmet, HelmetProvider } from "react-helmet-async"

export default function App({ client, location, context = {}}) {
  return (
    <ApolloProvider client={client}>
      <HelmetProvider context={helmetContext}>
        <Helmet>
          <title>Meteor React Apollo SSR</title>
        </Helmet>
        <Router location={location}>
          <Routes />
        </Router>
      </HelmetProvider>
    </ApolloProvider>
  );
}
