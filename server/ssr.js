import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import React from "react";
import { StaticRouter } from "react-router-dom";
import { onPageLoad } from "meteor/server-render";
import Routes from "./../imports/ui/Routes";

export const render = async (sink) => {
  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: "http://localhost:3010",
      credentials: "same-origin",
      // headers: {
      //   cookie: req.header("Cookie"),
      // },
    }),
    cache: new InMemoryCache(),
  });

  const App = (
    <ApolloProvider client={client}>
      <StaticRouter location={sink.request.url}>
        <Routes />
      </StaticRouter>
    </ApolloProvider>
  );
};

// hanlde SSR
onPageLoad(render);
