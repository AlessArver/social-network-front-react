import { FC } from 'react'
import clsx from 'clsx'

import { Navlink } from 'components/Navlink'

import s from './index.module.sass'

export interface INavItem {
  url?: string
  onClick?: () => void
  text: string
}
export interface INavbar {
  items: INavItem[]
  className?: string
}
export const Navbar: FC<INavbar> = ({ items, className }) => {
  return (
    <div className={clsx(s.navbar, className)}>
      {items.map(i =>
        i?.url ? (
          <Navlink key={i.text} href={i.url} className={s.navbar__item} activeClassName={s.navbar__item_active}>
            {i.text}
          </Navlink>
        ) : (
          <div onClick={i.onClick} key={i.text} className={s.navbar__item}>
            {i.text}
          </div>
        )
      )}
    </div>
  )
}
