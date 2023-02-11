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
  return (
    <div className={s.mainLayout}>
      <div>
        <Navbar />
      </div>
      <Card className={clsx(s.mainLayout__children, childrenClassName)} cardClassName={s.mainLayout__childrenCard}>
        {children}
      </Card>
    </div>
  )
}
