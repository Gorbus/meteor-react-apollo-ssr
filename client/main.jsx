import React from "react";
import App from "../imports/both/App";
import { onPageLoad } from "meteor/server-render";
import getApolloClient from "../imports/both/apolloClient";
import { hydrate } from "react-dom";

const client = getApolloClient();

onPageLoad((sink) =>
  hydrate(<App client={client} />, document.getElementById("app"))
);
