import { Meteor } from "meteor/meteor";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import fetch from "cross-fetch";

function cache() {
  if (Meteor.isClient) {
    return new InMemoryCache().restore(window.__APOLLO_STATE__);
  }
  return new InMemoryCache();
}

export default function getApolloClient() {
  return new ApolloClient({
    ssrMode: Meteor.isServer,
    link: createHttpLink({ uri: Meteor.absoluteUrl("/graphql"), fetch }),
    cache: cache(),
    ssrForceFetchDelay: 100,
  });
}
