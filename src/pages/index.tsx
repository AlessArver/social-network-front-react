import Router from 'next/router'
import { useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'

import { meVar } from 'apollo/variables/user'

export default function Home() {
  const me = useReactiveVar(meVar)

  useEffect(() => {
    if (me) {
      Router.push('/messages')
    } else {
      Router.push('/login')
    }
  }, [me])

  return <div></div>
}
