import Link from 'next/link'
import { FC, memo } from 'react'
import clsx from 'clsx'

import { IUser, USER, USERS_BY_IDS } from 'apollo/queries/user'

import { Avatar } from 'components/Avatar'

import s from './index.module.sass'

export interface IProfileFriends {
  owner_id: string
  items: IUser[]
  className?: string
}
export const ProfileFriends: FC<IProfileFriends> = memo(function ProfileFriends({ owner_id, items, className }) {
  return (
    <div className={clsx(s.profileFriends, className)}>
      <Link href={`/friends/${owner_id}`} className={s.profileFriends__title}>
        Friends
      </Link>
      <div className={s.profileFriends__items}>
        {items.map(i => (
          <Link href={`/profile/${i.id}`} key={i.id} className={s.profileFriends__item}>
            <Avatar size={40} />
            <span className={s.profileFriends__name}>{i.first_name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
})
