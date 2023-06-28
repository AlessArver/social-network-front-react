import Link from 'next/link'
import { FC, memo, useEffect } from 'react'
import clsx from 'clsx'
import { useLazyQuery } from '@apollo/client'

import { IUser, USERS_BY_IDS } from 'apollo/queries/user/user'
import { FRIENDS, IFriend } from 'apollo/queries/friend'

import { MAX_FRIENDS_COUNT } from 'constants/friends'

import { Avatar } from 'components/ui/Avatar'

import s from './index.module.sass'

export interface IProfileFriends {
  id: string
  className?: string
}
export const ProfileFriends: FC<IProfileFriends> = memo(function ProfileFriends({ id, className }) {
  const [getFriends] = useLazyQuery(FRIENDS)
  const [getUsersByIds, { data }] = useLazyQuery<{ usersByIds: IUser[] }>(USERS_BY_IDS)

  useEffect(() => {
    if (id) {
      getFriends({
        variables: { friendsInput: { from_id: id, limit: MAX_FRIENDS_COUNT } },
        onCompleted: data => {
          getUsersByIds({
            variables: {
              ids: data?.friends?.map((f: IFriend) => f.to_id)
            }
          })
        }
      })
    }
  }, [id])

  return (
    <div className={clsx(s.profileFriends, className)}>
      <Link href={`/friends/${id}`} className={s.profileFriends__title}>
        Friends
      </Link>
      <div className={s.profileFriends__items}>
        {data?.usersByIds?.map(user => (
          <Link href={`/profile/${user.id}`} key={user.id} className={s.profileFriends__item}>
            <Avatar size={40} />
            <span className={s.profileFriends__name}>{user.first_name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
})
