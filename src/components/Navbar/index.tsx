import { FC } from 'react'
import Link from 'next/link'
import { css } from '@emotion/react'
import clsx from 'clsx'
import { useReactiveVar } from '@apollo/client'

import { themeVar } from 'apollo/variables/app'

import PersonIcon from 'assets/icons/person.svg'
import MessagesIcon from 'assets/icons/message.svg'
import ArticleIcon from 'assets/icons/article.svg'
import SettingsIcon from 'assets/icons/settings.svg'
import PaletteIcon from 'assets/icons/palette.svg'
import ExitIcon from 'assets/icons/exit.svg'

import { FontTypeEnum, FontWeightEnum, Typography } from 'components/Typography'

import s from './index.module.sass'

const ITEMS = [
  { href: '/profile', icon: PersonIcon, authorizeed: true },
  { href: '/messages', icon: MessagesIcon, authorizeed: true },
  { href: '/news', icon: ArticleIcon, authorizeed: true },
  { href: '/settings', icon: SettingsIcon, authorizeed: true },
  { href: '/palette', icon: PaletteIcon }
]
export interface INavbar {
  className?: string
}
export const Navbar: FC<INavbar> = ({ className }) => {
  const theme = useReactiveVar(themeVar)

  return (
    <div
      className={clsx(s.navbar, className)}
      css={css`
        ${theme.navbar}
      `}
    >
      <Link href='/' className={s.navbar__logo}>
        <Typography fontType={FontTypeEnum.xs} fontWeight={FontWeightEnum.bold}>
          Social Network
        </Typography>
      </Link>
      <div className={s.navbar__items}>
        {ITEMS.map(i => (
          <Link href={i.href} className={s.navbar__item} key={i.href}>
            <i.icon />
          </Link>
        ))}
        <div className={s.navbar__item}>
          <ExitIcon />
        </div>
      </div>
    </div>
  )
}
