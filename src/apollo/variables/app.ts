import { makeVar } from '@apollo/client'
import { theme } from 'assets/theme'

export enum ThemeEnum {
  'light' = 'light',
  'dark' = 'dark'
}

export const currThemeVar = makeVar<ThemeEnum>(ThemeEnum.dark)
export const themeVar = makeVar<typeof theme.light>(theme.light)
