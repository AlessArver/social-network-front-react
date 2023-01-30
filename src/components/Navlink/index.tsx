import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { FC, ReactNode } from 'react'
import clsx from 'clsx'

export interface INavlink extends LinkProps {
  children: ReactNode
  className?: string
  activeClassName?: string
}
export const Navlink: FC<INavlink> = ({ children, href, className, activeClassName = '' }) => {
  const { pathname } = useRouter()
  const isActive = pathname.includes(`${href}`)

  return (
    <Link href={href} className={clsx(className, { [activeClassName]: isActive })}>
      {children}
    </Link>
  )
}
