import { FC, ReactNode } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

import s from './index.module.sass'

export interface INavbarItem {
  icon: ReactNode
  href?: string
  onClick?: () => void
  className?: string
}
export const NavbarItem: FC<INavbarItem> = ({ icon, href, onClick, className }) => {
  return href ? (
    <Link href={href} className={clsx(s.navbarItem, className)}>
      {icon}
    </Link>
  ) : (
    <div onClick={onClick} className={clsx(s.navbarItem, className)}>
      {icon}
    </div>
  )
}
