import { FC } from 'react'
import { useReactiveVar } from '@apollo/client'
import clsx from 'clsx'

import { themeVar } from 'apollo/variables/app'

import s from './index.module.sass'

export interface IShadow {
  className?: string
}
export const Shadow = ({ className }: IShadow) => {
  const theme = useReactiveVar(themeVar)

  return <div style={{ background: theme.shadowColor }} className={clsx(s.shadow, className)} />
}
