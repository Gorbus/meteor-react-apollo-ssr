import React from "react";
import { ApolloProvider } from "@apollo/client";
import Routes from "./../ui/Routes";
import Router from "./Router";
import { HelmetProvider } from "react-helmet-async";

export default function App({ client, location }) {
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <Router location={location}>
          <Routes />
        </Router>
      </HelmetProvider>
    </ApolloProvider>
  );
}
