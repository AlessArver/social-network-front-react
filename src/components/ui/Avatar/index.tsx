import { FC } from 'react'
import clsx from 'clsx'

import s from './index.module.sass'

export interface IAvatar {
  src?: string
  alt?: string
  size: number
  isOnline?: boolean
  showOnline?: boolean
  className?: string
  containerClassName?: string
}
export const Avatar = ({ src, alt, size, isOnline, showOnline, className, containerClassName }: IAvatar) => {
  return (
    <div
      className={clsx(containerClassName, s.avatar, { [s.avatar_online]: isOnline })}
      style={{ width: size, height: size }}
    >
      <div style={{ width: size, height: size }} className={clsx(s.avatar__wrapper, className)}>
        {!!src && <img src={src} alt={alt} className={s.avatar__image} />}
        {!!showOnline && <div className={s.avatar__status} />}
      </div>
    </div>
  )
}
