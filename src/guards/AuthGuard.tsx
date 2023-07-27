import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { isAuthVar, meLoadingVar, meVar } from 'apollo/variables/user'
import { socket } from 'utils/socket/socket'
import { useGetMe } from 'apollo/queries/user/hooks/useGetMe'
import { LOGIN_PAGE, PROFILE_PAGE, REGISTER_PAGE } from 'constants/routes'

export const AuthGuard = ({ children, requiredAuth }: { children: JSX.Element; requiredAuth?: boolean }) => {
  const { handleGetMe, loading, error } = useGetMe()
  const router = useRouter()

  useEffect(() => {
    handleGetMe(res => {
      meVar(res)
      isAuthVar(true)
      meLoadingVar(loading)
      socket.emit(`userOnline`, { id: res.id, socket_id: socket.id })
      if (router.pathname === LOGIN_PAGE || router.pathname === REGISTER_PAGE) {
        router.push(PROFILE_PAGE)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (error && requiredAuth) {
      router.push(LOGIN_PAGE)
    }
  }, [error, requiredAuth, router])

  if (loading) {
    return <>Loading...</>
  }

  return children
}
