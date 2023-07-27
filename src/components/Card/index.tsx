import { FC, ReactNode } from 'react'
import { useReactiveVar } from '@apollo/client'
import clsx from 'clsx'
import { css } from '@emotion/react'

import { ThemeEnum, themeVar } from 'apollo/variables/app'

import { Shadow } from 'components/ui/Shadow'

import s from './index.module.sass'

export interface ICard {
  children: ReactNode
  currTheme?: ThemeEnum
  className?: string
  cardClassName?: string
}
export const Card = ({ children, className, cardClassName }: ICard) => {
  const theme = useReactiveVar(themeVar)

  return (
    <div className={clsx(s.cardWrapper, className)}>
      <div
        className={clsx(s.card, cardClassName)}
        css={css`
          ${theme.card}
        `}
      >
        {children}
      </div>
      <Shadow />
    </div>
  )
}
