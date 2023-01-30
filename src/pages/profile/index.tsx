import Router from 'next/router'
import { useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'

import { meLoadingVar, meVar } from 'apollo/variables/user'

export default function ProfileMe() {
  const me = useReactiveVar(meVar)
  const meLoading = useReactiveVar(meLoadingVar)

  useEffect(() => {
    if (!meLoading) {
      if (me) {
        Router.push(`/profile/${me.id}`)
      } else {
        Router.push('/login')
      }
    }
  }, [me, meLoading])

  return <div></div>
}
