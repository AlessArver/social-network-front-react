import { colorGreenOpacity, colorGreyDark, colorGreyLight, colorGreyMedium, colorLight } from 'assets/theme/colors'

export const FormStyles = {
  light: {
    background: colorLight,
    borderColor: colorGreyLight,
    color: colorGreyDark,
    '::placeholder': {
      color: colorGreyLight
    }
  },
  dark: {
    background: colorGreyMedium,
    borderColor: colorGreenOpacity,
    color: colorLight,
    '::placeholder': {
      color: colorGreyLight
    }
  }
}
