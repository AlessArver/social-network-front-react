import { useCallback, useEffect, useState } from 'react'
import { useLazyQuery, useMutation, useQuery, useReactiveVar } from '@apollo/client'
import { useRouter } from 'next/router'

import { meVar } from 'apollo/variables/user'

import { IUser, USER, USERS_BY_IDS } from 'apollo/queries/user'
import { IPost, POSTS } from 'apollo/queries/post'
import { CREATE_POST, REMOVE_POST } from 'apollo/mutations/post'

import { socket } from 'utils/socket/socket'
import { POST_EVENTS } from 'utils/socket/events'

import { MainLayout } from 'layouts/MainLayout'

import { Avatar } from 'components/Avatar'
import { ProfileFriends } from 'components/pages/profile/ProfileFriends'
import { Post } from 'components/Post'
import { CreatePost } from 'components/pages/profile/CreatePost'
import { AddFriend } from 'components/pages/profile/AddFriend'

import s from 'styles/pages/profile.module.sass'
import { FRIENDS, IFriend } from 'apollo/queries/friend'

export default function Profile() {
  const router = useRouter()
  const { id } = router.query
  const me = useReactiveVar(meVar)
  const [getUser] = useLazyQuery(USER)
  const [_createPostMutation] = useMutation(CREATE_POST)
  const [_removePostMutation] = useMutation(REMOVE_POST)
  const [getFriends] = useLazyQuery(FRIENDS)
  const [getUsersByIds, { data: myFriends }] = useLazyQuery(USERS_BY_IDS)
  const [getPosts, { data: postsData, loading: postsLoading }] = useLazyQuery(POSTS)
  const [posts, setPosts] = useState<IPost[]>([])
  const [user, setUser] = useState<null | IUser>(null)
  const maxFriendsCount = 6

  useEffect(() => {
    if (id) {
      getUser({
        variables: { id },
        onCompleted: data => {
          setUser(data.user)
        }
      })

      getFriends({
        variables: { friendsInput: { from_id: id, limit: maxFriendsCount } },
        onCompleted: data => {
          getUsersByIds({
            variables: {
              ids: data?.friends?.map((f: IFriend) => f.to_id)
            }
          })
        }
      })

      getPosts({
        variables: { userId: id }
      })

      socket.on(`user-${id}`, res => {
        if (res) {
          setUser(res)
        }
      })
    }
  }, [id])

  useEffect(() => {
    if (postsData?.posts) {
      setPosts(postsData?.posts)
    }
  }, [postsData?.posts, postsLoading])

  const handleAddPost = useCallback((res: IPost) => {
    setPosts((prev: IPost[]) => [res, ...prev])
  }, [])

  const handleRemovePost = useCallback((postId: string) => {
    setPosts((prev: IPost[]) => prev.filter((p: IPost) => p.id !== postId))
  }, [])

  useEffect(() => {
    socket.on(POST_EVENTS.postAdded, (res: IPost) => handleAddPost(res))
    socket.on(POST_EVENTS.postRemoved, (res: IPost) => handleRemovePost(res.id))

    return () => {
      socket.removeListener(POST_EVENTS.postAdded)
      socket.removeListener(POST_EVENTS.postRemoved)
    }
  }, [handleAddPost, handleRemovePost])

  const onAddPost = (text: string) => {
    _createPostMutation({
      variables: { createPostInput: { text, userId: id } }
    })
  }

  const onRemovePost = (postId: string) => {
    _removePostMutation({
      variables: {
        id: postId
      }
    })
  }

  // if (loading) {
  //   return <>Loading...</>
  // }

  const getTime = (date?: Date) => {
    return date != null ? new Date(date).getTime() : 0
  }

  return (
    <MainLayout asideChildren={true && <ProfileFriends items={myFriends?.usersByIds || []} owner_id={`${id}`} />}>
      <div className={s.profile__header}>
        <div className={s.profile__headerColumn}>
          <Avatar size={100} className={s.profile__avatar} />
          <div className={s.profile__fullName}>
            {user?.first_name} {user?.last_name}
            <div>{user?.is_online ? 'online' : 'offline'}</div>
          </div>
        </div>
        {!!user && !!me && me.id !== user.id && <AddFriend me={me} user={user} />}
      </div>
      {!!me && me.id === id && <CreatePost handleAddPost={onAddPost} />}
      {!!user && !!posts?.length && (
        <div className={s.profile__posts}>
          {Array.from(posts)
            .sort((a, b) => {
              const leftDate: number = getTime(a.created_at)
              const rightDate: number = getTime(b.created_at)

              return rightDate - leftDate
            })
            .map(p => (
              <Post
                key={p.id}
                {...p}
                meId={me?.id}
                fullName={`${user?.first_name} ${user?.last_name}`}
                avatar={user?.avatar}
                handleRemovePost={onRemovePost}
              />
            ))}
        </div>
      )}
    </MainLayout>
  )
}
