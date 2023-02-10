import { colorDarkOpacity, colorGreyDark, colorLight, colorLightOpacity } from '../colors'

export const ButtonStyles = {
  light: {
    background: colorDarkOpacity,
    color: colorGreyDark,
    borderColor: colorGreyDark,
    '&:hover': {
      background: '#efefef'
    }
  },
  dark: {
    background: colorLightOpacity,
    color: colorLight,
    borderColor: colorLight,
    '&:hover': {
      background: '#efefef'
    }
  }
}
