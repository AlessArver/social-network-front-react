import { useMemo, useEffect, FC, ReactNode } from 'react'
import { useReactiveVar } from '@apollo/client'
import clsx from 'clsx'

import { currThemeVar, ThemeEnum, themeVar } from 'apollo/variables/app'

import { theme as themeData } from 'assets/theme'

import s from './index.module.sass'

export interface IPageLayout {
  children: ReactNode
}
export const PageLayout: FC<IPageLayout> = ({ children }) => {
  const currTheme = useReactiveVar(currThemeVar)
  const theme = useReactiveVar(themeVar)
  const customTheme = useMemo(
    () => ({
      background: 'pink',
      borderColor: 'red',
      fontColor: 'blue',
      card: {
        background: 'pink'
      }
    }),
    []
  )

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', e => currThemeVar(e.matches ? ThemeEnum.dark : ThemeEnum.light))

    currThemeVar(window.matchMedia('(prefers-color-scheme: dark)').matches ? ThemeEnum.dark : ThemeEnum.light)

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', () => {})
    }
  }, [])

  useEffect(() => {
    if (!customTheme) {
      themeVar(customTheme)
    } else {
      themeVar(currTheme === ThemeEnum.light ? themeData.light : themeData.dark)
    }
  }, [customTheme, currTheme])

  return (
    <div
      style={{ background: theme.background, color: theme.fontColor }}
      className={clsx(s.pageLayout, s[`pageLayout_${currTheme}`])}
    >
      {children}
    </div>
  )
}
