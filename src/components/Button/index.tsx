import { FC, ReactNode } from 'react'
import clsx from 'clsx'
import { css } from '@emotion/react'
import { themeVar } from 'apollo/variables/app'
import { useReactiveVar } from '@apollo/client'

import s from './index.module.sass'

export enum ButtonSize {
  xs = 'xs',
  sm = 'sm',
  md = 'md'
}
export enum ButtonType {
  danger = 'danger'
}
export interface IButton {
  children: ReactNode
  fullWidth?: boolean
  size?: ButtonSize
  onClick?: () => void
  htmlType?: 'button' | 'submit'
  disabled?: boolean
  type?: ButtonType
  className?: string
}
export const Button: FC<IButton> = ({
  children,
  fullWidth,
  size = ButtonSize.md,
  onClick,
  htmlType = 'button',
  disabled,
  type,
  className
}) => {
  const theme = useReactiveVar(themeVar)

  return (
    <button
      onClick={onClick}
      className={clsx(
        s.button,
        s[`button_${size}`],
        s[`button_${type}`],
        {
          [s.button_disabled]: disabled,
          [s.button_fullWidth]: fullWidth
        },

        className
      )}
      css={css`
        ${theme.button}
      `}
      type={htmlType}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
