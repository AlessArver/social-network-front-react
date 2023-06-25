import { FC, useEffect, useState } from 'react'

import s from './index.module.sass'
import { IPost, POSTS } from 'apollo/queries/post'
import { Post } from 'components/Post'
import { POST_EVENTS } from 'utils/socket/events'
import { socket } from 'utils/socket/socket'
import { useLazyQuery, useMutation } from '@apollo/client'
import { REMOVE_POST } from 'apollo/mutations/post'
import { getDateTime } from 'utils/getDateTime'
import { IUser } from 'apollo/queries/user'

export enum CreatePostValues {
  text = 'text'
}

export interface IPosts {
  id: string
  user: IUser
  me: IUser
}
export const Posts: FC<IPosts> = ({ id, me, user }) => {
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
    if (id) {
      getPosts({
        variables: { userId: id }
      })
    }
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
            meId={me.id}
            fullName={`${user.first_name} ${user.last_name}`}
            avatar={user.avatar}
            handleRemovePost={onRemovePost}
          />
        ))}
    </div>
  )
}
