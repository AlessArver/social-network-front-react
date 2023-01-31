import Link from 'next/link'
import { FC } from 'react'
import clsx from 'clsx'

import { useToggle } from 'hooks/useToggle'

import { Avatar } from 'components/Avatar'
import { Dropdown } from 'components/Dropdown'

import s from './index.module.sass'
import { MdMoreHoriz } from 'react-icons/md'

export interface IDialog {
  id: string
  avatar?: string
  fullName: string
  text: string
  className?: string
}
export const Dialog: FC<IDialog> = ({ id, fullName, text, className }) => {
  const showOptions = useToggle()

  return (
    <Link
      href={`/messages/${id}`}
      className={clsx(
        s.dialog,
        {
          [s.dialog_new]: false,
          [s.dialog_read]: false
        },
        className
      )}
    >
      <div className={s.dialog__header}>
        <div className={s.dialog__headerColumn}>
          <Avatar width={40} height={40} className={s.dialog__avatar} />
          <div className={s.dialog_fullName}>{fullName}</div>
        </div>
        <Dropdown
          childrenItems={[{ onClick: () => '', text: 'Remove' }]}
          visible={showOptions.value}
          onOpen={showOptions.set}
          onClose={showOptions.unset}
        >
          <MdMoreHoriz className={s.dialog__more} />
        </Dropdown>
      </div>
      <p className={s.dialog__text}>{text}</p>
    </Link>
  )
}
