import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

import { useLazyQuery, useMutation } from '@apollo/client'

import { MainLayout } from 'layouts/MainLayout'

import { FRIEND_TYPES } from 'constants/friends'

import { REMOVE_FRIEND, UPDATE_FRIEND } from 'apollo/mutations/friend'
import { FRIEND, FRIENDS, FriendStatus, IFriend } from 'apollo/queries/friend'
import { IUserByIdsQuery, USERS_BY_IDS } from 'apollo/queries/user/user'

import { FriendItem } from 'components/pages/friends/FriendItem'
import { Navbar } from 'components/Navbar'

import s from 'styles/pages/friends.module.sass'

export default function Friends() {
  const router = useRouter()
  const { id, type } = router.query
  const [getFriends] = useLazyQuery(FRIENDS)
  const [getUsersByIds, { data: users }] = useLazyQuery<IUserByIdsQuery>(USERS_BY_IDS)
  const [getFriend] = useLazyQuery(FRIEND)
  const [removeFriendMutation] = useMutation(REMOVE_FRIEND)
  const [updateFriendMutation] = useMutation(UPDATE_FRIEND)

  useEffect(() => {
    if (id) {
      getFriends({
        variables: { friendsInput: { from_id: id, status: type ? `${type}` : undefined } },
        onCompleted: data => {
          getUsersByIds({
            variables: {
              ids: data?.friends?.map((f: IFriend) => f.to_id)
            }
          })
        }
      })
    }
  }, [id, type])

  const handleRemoveFriend = useCallback((toId: string) => {
    getFriend({
      variables: { friendsInput: { from_id: id, to_id: toId } },
      onCompleted: data => {
        removeFriendMutation({
          variables: {
            id: data.friend.id
          }
        })
      }
    })
    getFriend({
      variables: { friendsInput: { from_id: toId, to_id: id } },
      onCompleted: data => {
        updateFriendMutation({
          variables: {
            updateFriendInput: {
              id: data.friend.id,
              status: FriendStatus.pending
            }
          }
        })
      }
    })
  }, [])

  const handleBlock = useCallback((toId: string) => {
    getFriend({
      variables: { friendsInput: { from_id: id, to_id: toId } },
      onCompleted: data => {
        updateFriendMutation({
          variables: {
            updateFriendInput: {
              id: data.friend.id,
              status: FriendStatus.blocked
            }
          }
        })
      }
    })
    getFriend({
      variables: { friendsInput: { from_id: toId, to_id: id } },
      onCompleted: data => {
        removeFriendMutation({
          variables: {
            id: data.friend.id
          }
        })
      }
    })
  }, [])

  return (
    <MainLayout childrenClassName={s.friends__layout}>
      <div className={s.friends__list}>
        {users?.usersByIds?.map(u => (
          <FriendItem onRemove={handleRemoveFriend} onBlock={handleBlock} {...u} key={u.id} />
        ))}
      </div>
      <div className={s.frinds__nav}>
        <Navbar
          items={FRIEND_TYPES.map(f => ({
            text: f.text,
            url: f.slug === 'added' ? `/friends/${id}` : `/friends/${id}?type=${f.slug}`
          }))}
          className={s.friends__nav}
        />
      </div>
    </MainLayout>
  )
}
