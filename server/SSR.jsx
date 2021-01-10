import { onPageLoad } from "meteor/server-render";
import React from "react";
import { renderToString } from "react-dom/server";
import { getMarkupFromTree } from "@apollo/client/react/ssr";
import App from "../imports/both/App";
import apolloClient from "../imports/both/apolloClient";
import { ServerStyleSheet } from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";

onPageLoad(async (sink) => {
  const helmetContext = {};
  const sheet = new ServerStyleSheet();
  const client = apolloClient;
  const tree = sheet.collectStyles(
    <HelmetProvider context={helmetContext}>
      <Helmet>
        <title>Meteor React Apollo SSR</title>
      </Helmet>
      <App client={client} location={sink.request.url} />
    </HelmetProvider>
  );

  return getMarkupFromTree({
    tree,
    context: {},
    renderFunction: renderToString,
  }).then((html) => {
    sink.renderIntoElementById("app", html);
    sink.appendToHead(sheet.getStyleTags());

    const { helmet } = helmetContext;
    sink.appendToHead(helmet.meta.toString());
    sink.appendToHead(helmet.title.toString());

    sink.appendToHead(`
    <script>
    window.__APOLLO_STATE__=${JSON.stringify(client.cache.extract()).replace(
      /</g,
      "\\u003c"
    )}
      </script>
      `);
  });
});
