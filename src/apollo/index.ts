import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Cookie from 'js-cookie'

const httpLink = createHttpLink({ uri: '/graphql' })
const authLink = setContext((_, { headers }) => {
  const token = Cookie.get('userToken')

  return {
    headers: {
      ...headers,
      'Access-Control-Allow-Origin': '*',
      authorization: token ? `Bearer ${token}` : null
    }
  }
})

const cache = new InMemoryCache({})

export const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
  queryDeduplication: false
})
