import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import Cookie from 'js-cookie'
import { addSeconds } from 'date-fns'

import { cookieFields } from 'constants/index'
import { alertsVar } from './variables/app'
import { AlertStatus } from 'models/alert'

const httpLink = createHttpLink({ uri: '/graphql' })
const authLink = setContext((_, { headers }) => {
  const token = Cookie.get(cookieFields.authToken)

  return {
    headers: {
      ...headers,
      'Access-Control-Allow-Origin': '*',
      authorization: token ? `Bearer ${token}` : null
    }
  }
})

const cache = new InMemoryCache({})

const errorLink = onError(({ graphQLErrors }) => {
  const newGraphQLErrors = graphQLErrors?.map(({ message }, index) => ({
    message,
    status: AlertStatus.error,
    date: addSeconds(new Date(), index)
  }))
  alertsVar(newGraphQLErrors)
})

export const client = new ApolloClient({
  cache,
  link: errorLink.concat(authLink.concat(httpLink)),
  queryDeduplication: false
})
