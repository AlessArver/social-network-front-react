import Router from 'next/router'
import { useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'

import { meLoadingVar, meVar } from 'apollo/variables/user'

import { LOGIN_PAGE, PROFILE_PAGE } from 'constants/routes'

export default function ProfileMe() {
  const me = useReactiveVar(meVar)
  const meLoading = useReactiveVar(meLoadingVar)

  useEffect(() => {
    if (!meLoading) {
      if (me) {
        Router.push(`${PROFILE_PAGE}/${me.id}`)
      } else {
        Router.push(LOGIN_PAGE)
      }
    }
  }, [me, meLoading])

  return <div>Loading . . .</div>
}
