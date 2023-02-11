import { useEffect, FC, ReactNode } from 'react'
import { useReactiveVar } from '@apollo/client'
import clsx from 'clsx'

import { currThemeVar, ThemeEnum, themeVar } from 'apollo/variables/app'
import { localstorageFields } from 'constants/index'

import { theme as themeData } from 'assets/theme'

import s from './index.module.sass'

export interface IPageLayout {
  children: ReactNode
}
export const PageLayout: FC<IPageLayout> = ({ children }) => {
  const currTheme = useReactiveVar(currThemeVar)
  const theme = useReactiveVar(themeVar)

  function handleChangeThemeToSystem() {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', e => currThemeVar(e.matches ? ThemeEnum.dark : ThemeEnum.light))

    currThemeVar(window.matchMedia('(prefers-color-scheme: dark)').matches ? ThemeEnum.dark : ThemeEnum.light)
  }

  useEffect(() => {
    const newTheme = localStorage.getItem(localstorageFields.theme)

    if (newTheme) {
      currThemeVar(ThemeEnum.custom)
      themeVar(JSON.parse(newTheme))
    } else {
      handleChangeThemeToSystem()
      themeVar(currTheme === ThemeEnum.light ? themeData.light : themeData.dark)
    }

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', () => {})
    }
  }, [currTheme])

  return (
    <div
      style={{ background: theme.background, color: theme.fontColor }}
      className={clsx(s.pageLayout, s[`pageLayout_${currTheme}`])}
    >
      {children}
    </div>
  )
}
