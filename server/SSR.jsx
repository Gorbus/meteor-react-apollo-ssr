import { Meteor }                 from "meteor/meteor";
import { onPageLoad }             from "meteor/server-render";
import React                      from 'react'
import { renderToString }         from 'react-dom/server'
import { getMarkupFromTree }      from '@apollo/client/react/ssr'
import App                        from '../imports/both/App'
import apolloClient               from '../imports/both/apolloClient'

onPageLoad(async sink => {
  const client = apolloClient
  const tree = <App client={client} location={sink.request.url} />
  return getMarkupFromTree({
    tree,
    context: {},
    renderFunction: renderToString
  }).then(html => {
    sink.renderIntoElementById("app", html);
    sink.appendToHead(`
    <script>
        window.__APOLLO_STATE__=${JSON.stringify(
          client.cache.extract()
        ).replace(/</g, "\\u003c")}
      </script>
    `);
  })
})
