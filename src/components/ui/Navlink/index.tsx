import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import clsx from 'clsx'

export interface INavlink extends LinkProps {
  children: ReactNode
  className?: string
  activeClassName?: string
}
export const Navlink = ({ children, href, className, activeClassName = '' }: INavlink) => {
  const { pathname } = useRouter()
  const isActive = pathname.includes(`${href}`)

  return (
    <Link href={href} className={clsx(className, { [activeClassName]: isActive })}>
      {children}
    </Link>
  )
}
