import { ChangeEventHandler, FC, HTMLInputTypeAttribute } from 'react'
import clsx from 'clsx'

import s from './index.module.sass'
import { useReactiveVar } from '@apollo/client'
import { themeVar } from 'apollo/variables/app'
import { css } from '@emotion/react'

export interface IInput {
  name?: string
  value?: string
  placeholder?: string
  smallText?: string
  touched?: boolean
  danger?: boolean
  type?: HTMLInputTypeAttribute
  fullWidth?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  className?: string
  inputClassName?: string
}
export const Input: FC<IInput> = ({
  name,
  value,
  placeholder,
  smallText,
  danger,
  touched,
  type,
  fullWidth,
  onChange,
  className,
  inputClassName
}) => {
  const theme = useReactiveVar(themeVar)

  return (
    <div
      className={clsx(
        s.input,
        {
          [s.input_fullWidth]: fullWidth,
          [s.input_danger]: touched && danger
        },
        className
      )}
    >
      <input
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        value={value}
        type={type}
        className={clsx(s.input__form, inputClassName)}
        css={css`
          ${theme.form}
        `}
      />
      <span
        className={clsx(s.input__smallText, {
          [s.input__smallText_show]: touched && !!smallText
        })}
      >
        {smallText}
      </span>
    </div>
  )
}
