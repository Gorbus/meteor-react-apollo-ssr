import { Meteor } from "meteor/meteor";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import fetch from "cross-fetch";

const cache = Meteor.isClient
  ? new InMemoryCache().restore(window.__APOLLO_STATE__)
  : new InMemoryCache();

export default function getApolloClient() {
  return new ApolloClient({
    ssrMode: Meteor.isServer,
    link: createHttpLink({ uri: Meteor.absoluteUrl('/graphql'), fetch }),
    cache,
    ssrForceFetchDelay: 100,
  })
}
