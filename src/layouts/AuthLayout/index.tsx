import { FormEvent, ReactNode } from 'react'
import { useReactiveVar } from '@apollo/client'

import { currThemeVar } from 'apollo/variables/app'

import { Button } from 'components/ui/Button'
import { Card } from 'components/Card'
import { Navbar } from 'components/Navbar'
import { FontTypeEnum, FontWeightEnum, Typography } from 'components/ui/Typography'

import s from './index.module.sass'

export interface IAuthLayout {
  children?: ReactNode
  footer?: ReactNode
  title: string
  loading?: boolean
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}
export const AuthLayout = ({ children, footer, title, loading, onSubmit }: IAuthLayout) => {
  const currTheme = useReactiveVar(currThemeVar)

  return (
    <div className={s.authLayout}>
      <div className={s.mainLayout__navbarWrapper}>
        <Navbar />
      </div>
      <div className={s.auth__cardWrapper}>
        <Card currTheme={currTheme} cardClassName={s.auth__card}>
          <form onSubmit={onSubmit} className={s.authLayout__form}>
            <Typography fontType={FontTypeEnum.h2} fontWeight={FontWeightEnum.medium} className={s.authLayout__title}>
              {title}
            </Typography>
            <div className={s.authLayout__inputs}>{children}</div>
            <Button htmlType='submit' disabled={loading}>
              Enter
            </Button>
            <div className={s.authLayout__footer}>{footer}</div>
          </form>
        </Card>
      </div>
    </div>
  )
}
