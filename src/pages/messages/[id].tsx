import { useState } from 'react'
import Router, { useRouter } from 'next/router'
import { MdKeyboardBackspace } from 'react-icons/md'

import { MainLayout } from 'layouts/MainLayout'

import { Input } from 'components/ui/Input'
import { Button } from 'components/ui/Button'
import { IMessageItem, Message } from 'components/pages/dialog/Message'

import s from 'styles/pages/dialog.module.sass'
import Link from 'next/link'

export default function DialogPage() {
  const router = useRouter()
  const myId = '55'
  const { id } = router.query
  const [messages] = useState<IMessageItem[]>([
    { id: '543e3', from_id: '54', text: 'Hi, how a u?' },
    { id: '5433', from_id: '55', text: 'Nice! How a u?' }
  ])

  const onGoBack = () => {
    Router.back()
  }

  return (
    <MainLayout>
      <div className={s.dialogPage}>
        <div className={s.dialogPage__header}>
          <MdKeyboardBackspace onClick={onGoBack} className={s.dialogPage__back} />
          <Link href={`/profile/${id}`} className={s.dialogPage__fullName}>
            Oleg Victorovich
          </Link>
        </div>
        <div className={s.dialogPage__messages}>
          {messages.map(m => (
            <Message key={m.id} {...m} isMe={myId === m.from_id} />
          ))}
        </div>
        <div className={s.dialogPage__inputWrapper}>
          <Input placeholder='Input text...' fullWidth inputClassName={s.dialogPage__input} />
          <Button className={s.dialogPage__button}>Enter</Button>
        </div>
      </div>
    </MainLayout>
  )
}
