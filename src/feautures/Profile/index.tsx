import { useEffect, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { useRouter } from 'next/router'

import { meVar } from 'apollo/variables/user'

import { IUser } from 'apollo/queries/user/user'
import { IUpdateUserRequest } from 'apollo/mutations/user/types'

import { socket } from 'utils/socket/socket'

import { MainLayout } from 'layouts/MainLayout'

import { ProfileFriends } from 'feautures/ProfileFriends'

import { ProfileHeader } from 'components/ProfileHeader'

import { CreatePost } from 'feautures/CreatePost'
import { Posts } from 'feautures/Posts'
import { useUpdateUser } from 'apollo/mutations/user/hooks/useUpdateUser'
import { useGetUser } from 'apollo/queries/user/hooks/useGetUser'

export default function Profile() {
  const router = useRouter()
  const { id } = router.query
  const me = useReactiveVar(meVar)
  const { handleGetUser } = useGetUser()
  const { handleUpdateUser, loading: updateUserLoading } = useUpdateUser()
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    // TODO: create constant for socket events
    socket.on(`user-${id || me?.id}`, res => {
      if (res) {
        if (id) setUser(res)
        else meVar(res)
      }
    })

    return () => {
      socket.off(`user-${id || me?.id}`)
    }
  }, [id, me])

  useEffect(() => {
    if (user?.id === me?.id) {
    } else if (user?.id !== me?.id) {
      handleGetUser(`${id}`, res => setUser(res))
    }
  }, [user, me])

  const updateUser = (data: Omit<Partial<IUpdateUserRequest>, 'id'>) => {
    if (me?.id) {
      handleUpdateUser(me.id, data)
    }
  }

  if (updateUserLoading) {
    // TODO: create component for loading
    return <>Loading...</>
  }

  return (
    <MainLayout asideChildren={true && <ProfileFriends id={`${id}`} />}>
      <ProfileHeader user={user} me={me} updateUser={updateUser} updateUserLoading={updateUserLoading} />
      {!!me && me.id === id && <CreatePost />}
      <Posts id={id} user={user} me={me} />
    </MainLayout>
  )
}
