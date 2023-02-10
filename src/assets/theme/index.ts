import { colorLight, colorGreen, colorGreenOpacity, colorPurple, colorGreyDark, colorGreyLight } from './colors'
import { ButtonStyles } from './components/button'
import { CardStyles } from './components/card'
import { FormStyles } from './components/form'
import { NavbarStyles } from './components/navbar'

export const theme = {
  light: {
    background: colorLight,
    shadowColor: colorPurple,
    fontColor: colorGreyDark,
    borderColor: colorGreyLight,
    card: CardStyles.light,
    button: ButtonStyles.light,
    form: FormStyles.light,
    navbar: NavbarStyles.light
  },
  dark: {
    background: colorGreyDark,
    shadowColor: colorGreen,
    fontColor: colorLight,
    borderColor: colorGreenOpacity,
    card: CardStyles.dark,
    button: ButtonStyles.dark,
    form: FormStyles.dark,
    navbar: NavbarStyles.dark
  }
}
