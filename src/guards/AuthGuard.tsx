import { useEffect } from 'react'
import Router from 'next/router'
import { useLazyQuery, useReactiveVar } from '@apollo/client'

import { isAuthVar, meLoadingVar, meVar } from 'apollo/variables/user'
import { ME } from 'apollo/queries/user'
import { socket } from 'utils/socket/socket'

export const AuthGuard = ({ children, requiredAuth }: { children: JSX.Element; requiredAuth?: boolean }) => {
  const [_getMe, { data, loading, error }] = useLazyQuery(ME)
  const isAuth = useReactiveVar(isAuthVar)

  useEffect(() => {
    _getMe()

    if (data?.me) {
      meVar(data?.me)
      isAuthVar(true)
      meLoadingVar(loading)
      socket.emit(`userOnline`, { id: data?.me?.id, socket_id: socket.id })
    }
  }, [data, isAuth])

  if (requiredAuth && error) {
    Router.push('/login')
  }

  if (loading) {
    return <>Loading...</>
  }

  return children
}
