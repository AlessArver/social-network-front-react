import { createElement, FC, ReactNode, useEffect, useState } from 'react'
import { Interpolation, Theme } from '@emotion/react'
import clsx from 'clsx'

import s from './index.module.sass'

export enum FontTypeEnum {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  body = 'body',
  xs = 'xs',
  xss = 'xss'
}
export enum FontWeightEnum {
  regular = 'regular',
  medium = 'medium',
  bold = 'bold'
}

interface ITypography {
  children: ReactNode
  fontType?: FontTypeEnum
  fontWeight?: FontWeightEnum
  className?: string
  css?: Interpolation<Theme>
}
export const Typography: FC<ITypography> = ({
  children,
  fontType = FontTypeEnum.body,
  fontWeight = FontWeightEnum.regular,
  className,
  css
}) => {
  const [tagName, setTagName] = useState('div')

  useEffect(() => {
    handleChangeTagName()
  }, [])

  function handleChangeTagName() {
    switch (fontType) {
      case FontTypeEnum.h1: {
        setTagName('h1')
        break
      }
      case FontTypeEnum.h2: {
        setTagName('h2')
        break
      }
      case FontTypeEnum.h3: {
        setTagName('h3')
        break
      }
      case FontTypeEnum.body: {
        setTagName('p')
        break
      }
      case FontTypeEnum.xs: {
        setTagName('div')
        break
      }
      case FontTypeEnum.xss: {
        setTagName('span')
        break
      }
    }
  }

  return createElement(
    tagName,
    {
      className: clsx(s[`${fontType}_${fontWeight}`], className),
      css
    },
    children
  )
}
