import { FC, ReactNode } from 'react'
import Cookie from 'js-cookie'
import Router from 'next/router'

import { isAuthVar, meVar } from 'apollo/variables/user'

import { Navbar } from 'components/Navbar'

import s from './index.module.sass'
import { Card } from 'components/Card'
import clsx from 'clsx'

export interface IMainLayout {
  children: ReactNode
  asideChildren?: ReactNode
  childrenClassName?: string
}
export const MainLayout: FC<IMainLayout> = ({ children, asideChildren, childrenClassName }) => {
  const NAV_ITEMS = [
    {
      url: '/profile',
      text: 'profile'
    },
    {
      url: '/messages',
      text: 'messages'
    },
    {
      url: '/settings',
      text: 'settings'
    },
    {
      onClick: () => {
        Cookie.remove('userToken')
        meVar(null)
        isAuthVar(false)
        Router.push('/login')
      },
      text: 'exit'
    }
  ]

  return (
    <div className={s.mainLayout}>
      <Navbar className={s.mainLayout__navbar} />
      <Card className={clsx(s.mainLayout__children, childrenClassName)} cardClassName={s.mainLayout__childrenCard}>
        {children}
      </Card>
    </div>
  )
}
