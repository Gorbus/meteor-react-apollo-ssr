import { onPageLoad } from "meteor/server-render";
import React from "react";
import { renderToString } from "react-dom/server";
import { getMarkupFromTree } from "@apollo/client/react/ssr";
import App from "../imports/both/App";
import getApolloClient from "../imports/both/apolloClient";
import { ServerStyleSheet } from "styled-components";

function getClientData(client) {
  const cache = JSON.stringify(client.cache.extract());
  return `<script>window.__APOLLO_STATE__=${cache.replace(
    /</g,
    "\\u003c"
  )}</script>`;
}

onPageLoad(async (sink) => {
  const sheet = new ServerStyleSheet();
  const client = getApolloClient();
  const helmetContext = {};
  const tree = sheet.collectStyles(
    <App client={client} location={sink.request.url} context={helmetContext} />
  );

  return getMarkupFromTree({
    tree,
    context: {},
    renderFunction: renderToString,
  }).then((html) => {
    const style = sheet.getStyleTags();
    const { helmet } = helmetContext;
    const clientData = getClientData(client);
    sink.appendToHead(style);
    sheet.seal();
    sink.appendToHead(helmet.meta.toString());
    sink.appendToHead(helmet.title.toString());
    sink.appendToHead(clientData);
    sink.renderIntoElementById("app", html);
  });
});
