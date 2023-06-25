import { FC } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

import { HOME_PAGE } from 'constants/routes'

import { Typography } from 'components/ui/Typography'

import s from './index.module.sass'

export interface ILogo {
  className?: string
}
export const Logo: FC<ILogo> = ({ className }) => {
  return (
    <Link href={HOME_PAGE} className={clsx(s.logo, className)}>
      <Typography>Social Network</Typography>
    </Link>
  )
}
