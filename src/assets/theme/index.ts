import { colorLight, colorGreen, colorPurple, colorGreyDark } from './colors'
import { ButtonStyles } from './components/button'
import { CardStyles } from './components/card'
import { FormStyles } from './components/form'
import { NavbarStyles } from './components/navbar'

export const theme = {
  light: {
    background: colorLight,
    shadowColor: colorPurple,
    fontColor: colorGreyDark,
    card: CardStyles.light,
    button: ButtonStyles.light,
    form: FormStyles.light,
    navbar: NavbarStyles.light
  },
  dark: {
    background: colorGreyDark,
    shadowColor: colorGreen,
    fontColor: colorLight,
    card: CardStyles.dark,
    button: ButtonStyles.dark,
    form: FormStyles.dark,
    navbar: NavbarStyles.dark
  }
}
