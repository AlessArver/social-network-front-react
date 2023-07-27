import { NextComponentType, NextPageContext } from 'next'
import { ApolloProvider } from '@apollo/client'

import { client } from 'apollo'

import { AuthGuard } from 'guards/AuthGuard'

import { PageLayout } from 'layouts/PageLayout'

import { ErrorBoundary } from 'components/ErrorBoundary'

import 'styles/index.sass'

type ComponentPropsType = {
  requireAuth?: boolean
}
type NewComponentType = ComponentPropsType & NextComponentType<ComponentPropsType, NextPageContext>

function App({ Component }: { Component: NewComponentType }) {
  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <AuthGuard requiredAuth={Component?.requireAuth}>
          <PageLayout>
            <Component />
          </PageLayout>
        </AuthGuard>
      </ApolloProvider>
    </ErrorBoundary>
  )
}
export default App
