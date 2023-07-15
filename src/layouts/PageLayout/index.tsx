import { useEffect, ReactNode, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { css } from '@emotion/react'

import { isCustomThemeVar, themeVar } from 'apollo/variables/app'
import { localstorageFields } from 'constants/index'

import { theme as themeData } from 'assets/theme'

import s from './index.module.sass'

export interface IPageLayout {
  children: ReactNode
}
export const PageLayout = ({ children }: IPageLayout) => {
  const theme = useReactiveVar(themeVar)
  const isCustomTheme = useReactiveVar(isCustomThemeVar)
  const [themeLoading, setThemeeLoading] = useState(true)

  function handleChangeThemeToSystem() {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', e => themeVar(e.matches ? themeData.dark : themeData.light))

    themeVar(window.matchMedia('(prefers-color-scheme: dark)').matches ? themeData.dark : themeData.light)
  }

  useEffect(() => {
    const newTheme = localStorage.getItem(localstorageFields.theme)

    if (newTheme) {
      isCustomThemeVar(true)
      themeVar(JSON.parse(newTheme))
    } else {
      handleChangeThemeToSystem()
    }

    setThemeeLoading(false)

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', () => {})
    }
  }, [isCustomTheme])

  return (
    <div
      className={s.pageLayout}
      css={css`
        background: ${theme.background};
        color: ${theme.fontColor};
      `}
    >
      {!themeLoading && children}
    </div>
  )
}
