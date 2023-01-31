import { NextComponentType } from 'next'
import { ComponentType } from 'react'
import { ApolloProvider } from '@apollo/client'

import { client } from 'apollo'

import 'styles/index.sass'
import { AuthGuard } from 'guards/AuthGuard'

type ComponentPropsType = {
  requireAuth?: boolean
}
type NewComponentType = ComponentPropsType & NextComponentType & ComponentType

export default function App({ Component, ...pageProps }: { Component: NewComponentType }) {
  return (
    <ApolloProvider client={client}>
      <AuthGuard requiredAuth={Component?.requireAuth}>
        <Component {...pageProps} />
      </AuthGuard>
    </ApolloProvider>
  )
}
