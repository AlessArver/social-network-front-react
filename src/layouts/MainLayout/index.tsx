import { FC, ReactNode } from 'react'
import clsx from 'clsx'

import { Navbar } from 'components/Navbar'
import { Card } from 'components/Card'

import s from './index.module.sass'

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
