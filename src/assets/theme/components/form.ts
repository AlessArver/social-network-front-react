import {
  colorGreenOpacity,
  colorGreyDark,
  colorGreyLight,
  colorGreyLight2,
  colorGreyMedium,
  colorLight
} from 'assets/theme/colors'

export const FormStyles = {
  light: {
    background: colorLight,
    borderColor: colorGreyLight,
    color: colorGreyDark,
    '::placeholder': {
      color: colorGreyLight2
    },
    ':focus': {
      outlineColor: colorGreyDark
    }
  },
  dark: {
    background: colorGreyMedium,
    borderColor: colorGreenOpacity,
    color: colorLight,
    '::placeholder': {
      color: colorGreyLight
    },
    '::focus': {
      color: colorGreyLight2
    }
  }
}
