import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import fetch from "cross-fetch";
import { Meteor } from "meteor/meteor";
import { renderToStringWithData } from "@apollo/client/react/ssr";
import React from "react";
import { StaticRouter, BrowserRouter } from "react-router-dom";
import { onPageLoad } from "meteor/server-render";
import Routes from "./../ui/Routes";
import { hydrate } from "react-dom";

const cache = Meteor.isClient
  ? new InMemoryCache().restore(window.__APOLLO_STATE__)
  : new InMemoryCache();

export const start = (sink) => {
  if (Meteor.isClient) {
    hydrate(window.__CSS__);
  }

  const client = new ApolloClient({
    ssrMode: Meteor.isServer,
    link: createHttpLink({ uri: "/graphql", fetch }),
    cache,
    ssrForceFetchDelay: 100,
  });

  let App;

  if (Meteor.isServer) {
    App = (
      <ApolloProvider client={client}>
        <StaticRouter location={sink.request.url}>
          <Routes />
        </StaticRouter>
      </ApolloProvider>
    );

    renderToStringWithData(App).then((html) => {
      sink.appendToHead(`
      <script>
          window.__APOLLO_STATE__=${JSON.stringify(
            client.cache.extract()
          ).replace(/</g, "\\u003c")}
        </script>
      `);
      sink.renderIntoElementById("app", html);
    });
  } else {
    App = (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ApolloProvider>
    );

    hydrate(App, document.getElementById("app"));
  }
};

onPageLoad(start);
