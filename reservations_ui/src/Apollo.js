import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import fetch from 'node-fetch'
import { createHttpLink } from 'apollo-link-http'
import { from } from 'apollo-link'

const _global = typeof global !== 'undefined' ? global : (typeof window !== 'undefined' ? window : {})

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  fetch: fetch
})

const errorLink = onError(({networkError, graphQLErrors, operation}) => {
  if (networkError) {
    console.error('Network Error:', networkError)
  }
  if (operation && operation.query) {
    console.debug('Failed GraphQL query:', operation.query.loc.source.body)
    console.debug('Failed GraphQL query variables:', JSON.stringify(operation.variables, null, 2))
  }
})

const Client = new ApolloClient({
  dataIdFromObject: o => o.__typeName + o.id,
  link: from([
    errorLink,
    httpLink
  ]),
  cache: new InMemoryCache().restore(_global.__APOLLO_STATE__)
})

export default Client
