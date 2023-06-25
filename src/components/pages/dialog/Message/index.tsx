import { FC } from 'react'
import { MdMoreHoriz } from 'react-icons/md'
import clsx from 'clsx'

import { Dropdown } from 'components/ui/Dropdown'

import s from './index.module.sass'
import { useToggle } from 'hooks/useToggle'

export interface IMessageItem {
  id: string
  from_id: string
  text: string
}
export interface IMessage extends IMessageItem {
  isMe?: boolean
}
export const Message: FC<IMessage> = ({ isMe, text }) => {
  const showOptions = useToggle()

  return (
    <div className={clsx({ [s.message_my]: isMe })}>
      <div className={s.message}>
        <div
          className={clsx(s.message__header, {
            [s.message__header_show]: isMe
          })}
        >
          <Dropdown
            childrenItems={
              [
                // { onClick: () => {}, text: "Edit" },
                // { onClick: () => {}, text: 'Remove' }
              ]
            }
            visible={showOptions.value}
            onOpen={showOptions.set}
            onClose={showOptions.unset}
          >
            <MdMoreHoriz onClick={showOptions.toggle} className={s.message__more} />
          </Dropdown>
        </div>
        <p className={s.message__text}>{text}</p>
      </div>
    </div>
  )
}
