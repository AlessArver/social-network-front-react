import { FC } from 'react'
import Link from 'next/link'
import { css } from '@emotion/react'
import clsx from 'clsx'
import { useReactiveVar } from '@apollo/client'

import { themeVar } from 'apollo/variables/app'

import { HOME_PAGE } from 'constants/routes'

import { Typography } from 'components/ui/Typography'

import s from './index.module.sass'

export interface ILogo {
  className?: string
}
export const Logo: FC<ILogo> = ({ className }) => {
  const theme = useReactiveVar(themeVar)

  return (
    <Link
      href={HOME_PAGE}
      className={clsx(s.logo, className)}
      css={css`
        ${theme.logo}
      `}
    >
      <Typography>Social Network</Typography>
    </Link>
  )
}
