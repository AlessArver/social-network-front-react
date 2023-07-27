import { makeVar } from '@apollo/client'
import { theme } from 'assets/theme'
import { IAlertModel } from 'models/alert'

export enum ThemeEnum {
  'light' = 'light',
  'dark' = 'dark'
}

export const currThemeVar = makeVar<ThemeEnum>(ThemeEnum.dark)
export const isCustomThemeVar = makeVar<boolean>(false)
export const themeVar = makeVar<typeof theme.light | typeof theme.dark>(theme.light)

export const alertsVar = makeVar<IAlertModel[]>([])
export const maxAlertsLengthVar = makeVar(5)
