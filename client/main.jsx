import React from "react";
import App from "../imports/both/App";
import { onPageLoad } from "meteor/server-render";
import apolloClient from "../imports/both/apolloClient";
import { hydrate } from "react-dom";
import { HelmetProvider } from "react-helmet-async";

onPageLoad((sink) =>
  hydrate(
    <HelmetProvider>
      <App client={apolloClient} />
    </HelmetProvider>,
    document.getElementById("app")
  )
);
