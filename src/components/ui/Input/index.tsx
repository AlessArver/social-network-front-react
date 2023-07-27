import { ChangeEventHandler, HTMLInputTypeAttribute, ReactNode } from 'react'
import { useReactiveVar } from '@apollo/client'
import clsx from 'clsx'
import { css } from '@emotion/react'

import { themeVar } from 'apollo/variables/app'

import s from './index.module.sass'

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
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  className?: string
  inputWrapperClassName?: string
  inputClassName?: string
}
export const Input = ({
  name,
  value,
  placeholder,
  smallText,
  danger,
  touched,
  type,
  fullWidth,
  onChange,
  leftIcon,
  rightIcon,
  className,
  inputWrapperClassName,
  inputClassName
}: IInput) => {
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
      <div className={clsx(s.input__formWrapper, inputWrapperClassName)}>
        {!!leftIcon && <div>{leftIcon}</div>}
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
        {!!rightIcon && <div>{rightIcon}</div>}
      </div>
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
