import { default as LinkBase, LinkProps } from 'next/link'
import { ReactNode } from 'react'
import clsx from 'clsx'

import { FontTypeEnum, Typography } from 'components/ui/Typography'

import s from './index.module.sass'

export interface ILink extends LinkProps {
  children: ReactNode
  className?: string
}
export const Link = ({ children, className, ...props }: ILink) => (
  <LinkBase {...props} className={clsx(s.link, className)}>
    <Typography fontType={FontTypeEnum.xs}>{children}</Typography>
  </LinkBase>
)
