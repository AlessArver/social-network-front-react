import { FC, FormEventHandler, ReactNode } from 'react'
import Link from 'next/link'
import { useReactiveVar } from '@apollo/client'

import { currThemeVar } from 'apollo/variables/app'

import { Button } from 'components/Button'
import { Card } from 'components/Card'

import s from './index.module.sass'
import { Navbar } from 'components/Navbar'
import { FontTypeEnum, FontWeightEnum, Typography } from 'components/Typography'

export enum AuthLayoutType {
  register = 'register',
  login = 'login'
}
export interface IAuthLayout {
  children?: ReactNode
  onSubmit: FormEventHandler<HTMLFormElement>
  type: AuthLayoutType.register | AuthLayoutType.login
  loading?: boolean
}
export const AuthLayout: FC<IAuthLayout> = ({ children, onSubmit, type, loading }) => {
  const currTheme = useReactiveVar(currThemeVar)

  return (
    <div className={s.authLayout}>
      <div className={s.mainLayout__navbarWrapper}>
        <Navbar />
      </div>
      <div className={s.auth__cardWrapper}>
        <Card currTheme={currTheme}>
          <form onSubmit={onSubmit} className={s.authLayout__form}>
            <Typography fontType={FontTypeEnum.h2} fontWeight={FontWeightEnum.medium} className={s.authLayout__title}>
              {type === AuthLayoutType.register ? 'Register' : 'Login'}
            </Typography>
            <div className={s.authLayout__inputs}>{children}</div>
            <Button htmlType='submit' disabled={loading}>
              Enter
            </Button>
            <Link href={type === AuthLayoutType.register ? '/login' : '/register'} className={s.authLayout__link}>
              {type === AuthLayoutType.register ? 'login' : 'register'}
            </Link>
          </form>
        </Card>
      </div>
    </div>
  )
}
