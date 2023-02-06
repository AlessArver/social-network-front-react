import Link from 'next/link'
import { FC } from 'react'
import { MdMoreHoriz } from 'react-icons/md'

import { IPost } from 'apollo/queries/post'

import { useToggle } from 'hooks/useToggle'

import { Avatar } from 'components/Avatar'
import { Dropdown } from 'components/Dropdown'

import s from './index.module.sass'

export interface IPostProps extends IPost {
  meId?: string
  avatar?: string
  fullName: string
  handleRemovePost: (postId: string) => void
}
export const Post: FC<IPostProps> = ({ meId, id, userId, avatar, fullName, text, handleRemovePost }) => {
  const showOptions = useToggle(false)

  const onRemove = () => {
    handleRemovePost(id)
  }

  return (
    <div className={s.post}>
      <div className={s.post__header}>
        <Link href={`/profile/${userId}`} className={s.post__owner}>
          <Avatar size={40} src={avatar} className={s.post__avatar} />
          <div className={s.post__fullName}>{fullName}</div>
        </Link>
        {meId === userId && (
          <Dropdown
            childrenItems={[
              // { onClick: () => {}, text: "Edit" },
              { onClick: onRemove, text: 'Remove' }
            ]}
            visible={showOptions.value}
            onOpen={showOptions.set}
            onClose={showOptions.unset}
          >
            <MdMoreHoriz onClick={showOptions.toggle} className={s.post__more} />
          </Dropdown>
        )}
      </div>
      <p className={s.post__text}>{text}</p>
    </div>
  )
}
