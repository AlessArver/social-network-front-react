import { FC } from 'react'
import Router from 'next/router'
import { css } from '@emotion/react'
import clsx from 'clsx'
import { useReactiveVar } from '@apollo/client'
import Cookie from 'js-cookie'

import { themeVar } from 'apollo/variables/app'
import { isAuthVar, meVar } from 'apollo/variables/user'

import { cookieFields } from 'constants/index'

import PersonIcon from 'assets/icons/person.svg'
import MessagesIcon from 'assets/icons/message.svg'
import ArticleIcon from 'assets/icons/article.svg'
import SettingsIcon from 'assets/icons/settings.svg'
import PaletteIcon from 'assets/icons/palette.svg'
import ExitIcon from 'assets/icons/exit.svg'

import { Logo } from 'components/Logo'
import { NavbarItem } from 'components/NavbarItem'

import s from './index.module.sass'

const ITEMS = [
  { href: '/profile', icon: PersonIcon, authorized: true },
  { href: '/messages', icon: MessagesIcon, authorized: true },
  { href: '/news', icon: ArticleIcon, authorized: true },
  { href: '/settings', icon: SettingsIcon, authorized: true },
  { href: '/palette', icon: PaletteIcon }
]
export interface INavbar {
  className?: string
}
export const Navbar: FC<INavbar> = ({ className }) => {
  const theme = useReactiveVar(themeVar)
  const isAuth = useReactiveVar(isAuthVar)

  const onExit = () => {
    Cookie.remove(cookieFields.authToken)
    meVar(null)
    isAuthVar(false)
    Router.push('/login')
  }

  return (
    <div
      className={clsx(s.navbar, className)}
      css={css`
        ${theme.navbar}
      `}
    >
      <Logo className={s.navbar__logo} />
      <div className={s.navbar__items}>
        {ITEMS.map((i, index) =>
          i?.authorized ? (
            !!isAuth && <NavbarItem href={i.href} icon={<i.icon />} key={index} className={s.navbar__item} />
          ) : (
            <NavbarItem href={i.href} icon={<i.icon />} key={index} className={s.navbar__item} />
          )
        )}
        {!!isAuth && <NavbarItem onClick={onExit} icon={<ExitIcon />} className={s.navbar__item} />}
      </div>
    </div>
  )
}
