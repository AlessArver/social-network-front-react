import { useEffect, useState } from 'react'
import { useLazyQuery, useMutation, useReactiveVar } from '@apollo/client'
import { useRouter } from 'next/router'

import { meVar } from 'apollo/variables/user'

import { IUser, USER } from 'apollo/queries/user'
import { UPDATE_USER } from 'apollo/mutations/user/user'
import { IUpdateUserRequest } from 'apollo/mutations/user/types'

import { socket } from 'utils/socket/socket'

import { MainLayout } from 'layouts/MainLayout'

import { ProfileFriends } from 'feautures/ProfileFriends'

import { ProfileHeader } from 'components/ProfileHeader'

import { CreatePost } from 'feautures/CreatePost'
import { Posts } from 'feautures/Posts'

export default function Profile() {
  const router = useRouter()
  const { id } = router.query
  const me = useReactiveVar(meVar)
  const [getUser] = useLazyQuery(USER)
  const [updateUserMutation] = useMutation(UPDATE_USER)
  const [user, setUser] = useState<null | IUser>(null)

  useEffect(() => {
    if (id) {
      getUser({
        variables: { id },
        onCompleted: data => {
          setUser(data.user)
        }
      })

      // TODO: create constant for socket events
      socket.on(`user-${id}`, res => {
        if (res) {
          setUser(res)
        }
      })
    }

    return () => {
      socket.off(`user-${id}`)
    }
  }, [id])

  const updateUser = (data: Omit<Partial<IUpdateUserRequest>, 'id'>) => {
    if (me?.id) {
      updateUserMutation({
        variables: {
          updateUserInput: { id: me.id, ...data }
        }
      })
    }
  }

  if (!me || !user) {
    // TODO: create component for loading
    return <>Loading...</>
  }

  return (
    <MainLayout asideChildren={true && <ProfileFriends id={`${id}`} />}>
      <ProfileHeader user={user} me={me} updateUser={updateUser} />
      {!!me && me.id === id && <CreatePost />}
      <Posts id={`${id}`} user={user} me={me} />
    </MainLayout>
  )
}
