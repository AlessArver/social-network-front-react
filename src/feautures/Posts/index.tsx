import { useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'

import { IPost, POSTS } from 'apollo/queries/post'
import { REMOVE_POST } from 'apollo/mutations/post'
import { IUser } from 'apollo/queries/user'

import { POST_EVENTS } from 'utils/socket/events'
import { getDateTime } from 'utils/getDateTime'
import { socket } from 'utils/socket/socket'

import { Post } from 'components/Post'

import s from './index.module.sass'

export enum CreatePostValues {
  text = 'text'
}

export interface IPosts {
  id: string | string[] | undefined
  user: IUser | null
  me: IUser | null
}
export const Posts = ({ id, me, user }: IPosts) => {
  const [posts, setPosts] = useState<IPost[]>([])
  const [_removePostMutation] = useMutation(REMOVE_POST)
  const [getPosts, { data: postsData, loading: postsLoading }] = useLazyQuery(POSTS)

  useEffect(() => {
    handleFetchPosts()
  }, [id])

  useEffect(() => {
    if (postsData?.posts) {
      setPosts(postsData?.posts)
    }
  }, [postsData?.posts, postsLoading])

  useEffect(() => {
    socket.on(POST_EVENTS.postAdded, (res: IPost) => setPosts(prev => [res, ...prev]))
    socket.on(POST_EVENTS.postRemoved, (res: IPost) =>
      setPosts((prev: IPost[]) => prev.filter((p: IPost) => p.id !== res.id))
    )

    return () => {
      socket.removeListener(POST_EVENTS.postAdded)
      socket.removeListener(POST_EVENTS.postRemoved)
    }
  }, [])

  function handleFetchPosts() {
    getPosts({
      variables: { userId: id || me?.id }
    })
  }

  const onRemovePost = (postId: string) => {
    _removePostMutation({
      variables: {
        id: postId
      }
    })
  }

  if (postsLoading) {
    return <>Loading...</>
  }

  return (
    <div className={s.profile__posts}>
      {Array.from(posts)
        .sort((a, b) => {
          const leftDate: number = getDateTime(a.created_at)
          const rightDate: number = getDateTime(b.created_at)

          return rightDate - leftDate
        })
        .map(p => (
          <Post
            key={p.id}
            {...p}
            meId={me?.id}
            fullName={`${user?.first_name || me?.first_name} ${user?.last_name || me?.last_name}`}
            avatar={user?.avatar || me?.avatar}
            handleRemovePost={onRemovePost}
          />
        ))}
    </div>
  )
}
