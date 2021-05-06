import React from "react";
import App from "../imports/both/App";
import { onPageLoad } from "meteor/server-render";
import getApolloClient from "../imports/both/apolloClient";
import { hydrate } from "react-dom";

onPageLoad((sink) =>
  hydrate(<App client={getApolloClient()} />, document.getElementById("app"))
);
