import { IUserByIdsQueryItem } from 'apollo/queries/user/user'
import { Avatar } from 'components/ui/Avatar'
import { ButtonSize, Button } from 'components/ui/Button'
import { memo } from 'react'

import s from './index.module.sass'

export interface IFriendItem {
  onRemove: (id: string) => void
  onBlock: (id: string) => void
}

export const FriendItem = memo(function FriendItem({
  id,
  first_name,
  last_name,
  avatar,
  is_online,
  onRemove,
  onBlock
}: IFriendItem & IUserByIdsQueryItem) {
  const handleRemove = () => {
    onRemove(id)
  }

  const handleBlock = () => {
    onBlock(id)
  }

  return (
    <div className={s.friend_item}>
      <Avatar isOnline={is_online} src={avatar} size={50} showOnline />
      <div className={s.friend_col}>
        <div className={s.friend_fullName}>
          <span>{first_name}</span>
          <span>{last_name}</span>
        </div>
        <div className={s.friend_buttons}>
          <Button onClick={handleRemove} size={ButtonSize.xs} className={s.friend_button}>
            remove
          </Button>
          <Button onClick={handleBlock} size={ButtonSize.xs} className={s.friend_button}>
            block
          </Button>
        </div>
      </div>
    </div>
  )
})
